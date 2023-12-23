import api from "../../api/project.research.facts";
import detail from "./project.research.facts.detail";
import factsGrid from "./project.factsGrid.filter";
import comparing from "./project.research.facts.comparing";
import { arrayUnique } from "@/sat-vue-toolkit/satlegal/utils"
import moment from "moment";
import {$$STORE_PREFIX} from "../../utils";
const state = {
  dataFactsReSearch: {},
  totalsFacts: null,
  dataNotesFacts: [],
  totalsNoteFacts: 0,
  dataAttachment: [],
  totalsAttachment: 0,
  dataComment: [],
  totalsComment: 0,
  dataFactsDetail: {},

  dataFactsSupport: [],
  total_support: 0,
};

function summaryGroup(data) {
  const group = {};
  (data || []).forEach(x =>
    (group[x.type] = group[x.type] || []).push(x)
  );
  const array = [];
  Object.keys(group).forEach(x => {
    let mergeC = [];
    let mergeI = [];
    let mergeL = [];
    group[x].forEach(fact => {
      mergeC = arrayUnique(mergeC.concat(fact.characters));
      mergeI = arrayUnique(mergeI.concat(fact.issue));
      mergeL = arrayUnique(mergeL.concat(fact.location));
    });
    array.push({
      type: x,
      fact: group[x].length,
      character: mergeC.length,
      issue: mergeI.length,
      location: mergeL.length
    });
  });
  return array;
}

function summaryOverview(data) {
  let mergeC = [];
  let mergeI = [];
  let mergeL = [];
  (data || []).forEach(x => {
    mergeC = arrayUnique(mergeC.concat(x.characters));
    mergeI = arrayUnique(mergeI.concat(x.issue));
    mergeL = arrayUnique(mergeL.concat([x.location]));
  });
  const sumary = {
    character: mergeC.length,
    issue: mergeI.length,
    location: mergeL.length
  };
  return sumary;
}

const getters = {
  totalsFacts: state => state.totalsFacts,
  dataFactsReSearch: (state, getters, rootState, rootGetters) => {
    const filters =
      rootGetters["ht_store/project/research/facts/factsGrid/activeFilters"];
    let tasks =
      state.dataFactsReSearch.dataTableFacts &&
      state.dataFactsReSearch.dataTableFacts.slice();
    filters.forEach(filter => {
      switch (filter.name) {
        case "creator":
          if (!filter.value) return;
          var userId = filter.value.map(i => i.id);
          tasks = tasks.filter(e => {
            return userId.includes(e.creator);
          });
          break;
        case "characters":
          if (!filter.value) return;
          var charactersId = filter.value.map(i => i.id);
          tasks = tasks.reduce((sum, task) => {
            var check = task.characters.filter(character =>
              charactersId.find(id => id === character)
            );
            if (check.length !== 0) {
              sum = [...sum, task];
            }
            return sum;
          }, []);
          break;
        case "startdate":
          if (!filter.value) return;
          var startDate = moment(filter.value);
          tasks = tasks.filter(x => {
            return (
              new Date(x.dateTime.from).getTime() >
              new Date(startDate).getTime()
            );
          });
          break;
        case "enddate":
          if (!filter.value) return;
          var endDate = moment(filter.value);
          tasks = tasks.filter(x => {
            return (
              new Date(x.dateTime.from).getTime() < new Date(endDate).getTime()
            );
          });
          break;
      }
    });
    return tasks;
  },
  dataSummaryGroup: state => {
    return summaryGroup(state.dataFactsReSearch.dataTableFacts);
  },
  dataSummaryOverview: state => {
    return summaryOverview(state.dataFactsReSearch.dataTableFacts);
  },
  dataCharacterGroup: state => {
    const data = {};
    (state.dataFactsReSearch.dataTableFacts || []).forEach(e =>
      e.characters.forEach(e1 => {
        (data[e1] = data[e1] || []).push(e);
      })
    );
    return data;
  },
  dataFavorableGroup: state => {
    const data = {};
    (state.dataFactsReSearch.dataTableFacts || []).forEach(e =>
      (data[e.favorable] = data[e.favorable] || []).push(e)
    );
    return data;
  },
  dataIssue: state => {
    let data = [];
    (state.dataFactsReSearch.dataTableFacts || []).forEach(x => {
      x.issue.forEach(y => {
        if (!data.some(z => z.text === y.text)) {
          data.push(y);
        }
      });
    });
    return data;
  },
  dataFactIssue: state => {
    let data = {};
    (state.dataFactsReSearch.dataTableFacts || []).forEach(e =>
      e.issue.forEach(e1 => {
        (data[e1] = data[e1] || []).push(e);
      })
    );
    return data;
  },
  dataFactType: state => {
    const data = {};
    (state.dataFactsReSearch.dataTableFacts || []).forEach(e =>
      (data[e.type] = data[e.type] || []).push(e)
    );
    return data;
  },
  dataFactDisputed: state => {
    const data = {};
    (state.dataFactsReSearch.dataTableFacts || []).forEach(e =>
      (data[e.disputed] = data[e.disputed] || []).push(e)
    );
    return data;
  },
  dataFactLocation: state => {
    const data = {};
    (state.dataFactsReSearch.dataTableFacts || []).forEach(e =>
      (data[e.location] = data[e.location] || []).push(e)
    );
    return data;
  },

  dataNotesFacts: state => state.dataNotesFacts,
  totalsNoteFacts: state => state.totalsNoteFacts,
  dataAttachment: state => state.dataAttachment,
  totalsAttachment: state => state.totalsAttachment,
  dataComment: state => state.dataComment,
  totalsComment: state => state.totalsComment,
  dataFactsDetail: state => state.dataFactsDetail,
  dataFactsSupport: state => state.dataFactsSupport,
  total_support: state => state.total_support
};

const actions = {
  async removeFacts({ commit }, facts) {
    commit("removeFacts", facts, await api.removeFacts(facts))
  },
  async getDataFactsResearchRequest({ commit }, pagination) {
    commit("getDataFactsResearch", await api.getDataFactsReSearch(pagination));
  },
  async updateTask({ commit }, data) {
    commit("updateTaskSuccess", await api.updateFacts(data));
  },
  async createFactsItem({ commit }, data) {
    commit("createFactsItem", await api.createFactsItem(data));
  },

  async getNoteFacts({ commit }, req) {
    commit("getNoteFacts", await api.getNoteFacts(req))
  },
  async createNoteFact({ commit }, req) {
    commit("createNoteFact", await api.createNoteFact(req))
  },
  async removeNoteFact({ commit }, req) {
    commit("removeNoteFact", req, await api.removeNoteFact(req))
  },
  async editNoteFact({ commit }, req) {
    commit("editNoteFact", await api.editNoteFact(req));
  },

  async createFactAttachment({ commit }, req) {
    commit("createFactAttachment", await api.createFactAttachment(req))
  },
  async removeFactAttachment({ commit }, req) {
    commit("removeFactAttachment", req, await api.removeFactAttachment(req));
  },
  async getFactAttachment({ commit }, req) {
    commit("getFactAttachment", await api.getFactAttachment(req))
  },
  async getCommentFacts({ commit }, request) {
    commit("getCommentFacts", await api.getCommentFacts(request))
  },
  async sendCommentFacts({ commit }, request) {
    commit("sendCommentFacts", await api.sendCommentFacts(request))
  },
  async getDataFactsDetail({ commit }, request) {
    commit("getDataFactsDetail", await api.getDataFactsDetail(request))
  },
  async updateFactsDetail({ commit }, request) {
    commit("updateFactsDetail", await api.updateFacts(request))
  },
  async getFactsCharacter({ commit }, req) {
    commit("getFactsCharacter", await api.getFactsCharacter(req))
  },
  // Support
  async getSupportFacts({ commit }, request) {
    commit("getSupportFacts", await api.getSupportFacts(request));
  },
  async postSupportFacts({ commit }, request) {
    commit("postSupportFacts", await api.postSupportFacts(request));
  },
  async updateSupportFacts({ commit }, request) {
    commit("updateSupportFacts", await api.updateSupportFacts(request));
  },
  async removeSupportFacts({ commit }, request) {
    commit("removeSupportFacts", request, await api.removeSupportFacts(request));
  },
  // sub Support
  async postSubFactsSupport({ commit }, request) {
    const result = await api.postSubFactsSupport(request)
    commit("postSubFactsSupport", { result, request });
  },
  async updateSubFactsSupport({ commit }, request) {
    const result = await api.updateSubFactsSupport(request);
    commit("updateSubFactsSupport", { request, result });
  },
  async removeSubFactsSupport({ commit }, request) {
    commit("removeSubFactsSupport", request, await api.removeSubFactsSupport(request));
  },
  async updateCharactersSupport({ commit }, request) {
    const result = await api.updateCharactersSupport(request)
    commit("updateCharactersSupport", { request, result });
    return result;
  }
};

const mutations = {
  removeFacts(state, facts) {
    state.dataFactsReSearch.dataTableFacts = state.dataFactsReSearch.dataTableFacts.filter(x => x.id !== facts.id)
  },
  getDataFactsResearch(state, dataFactsReSearch) {
    state.dataFactsReSearch = dataFactsReSearch;
    state.totalsFacts = state.dataFactsReSearch.totals
  },
  createFactsItem(state, response) {
    state.dataFactsReSearch.dataTableFacts = [
      response,
      ...state.dataFactsReSearch.dataTableFacts,
    ];
  },
  updateTaskSuccess(state, resp) {
    state.dataFactsReSearch.dataTableFacts = state.dataFactsReSearch.dataTableFacts.map(x => {
      if (x.id === resp.pk) {
        return {
          ...x,
          ...resp,
          characters: resp.characters.map(c => c.character.pk),
          issue: resp.issues.map(i => i.pk),
          label: resp.tags.map(lab => lab.pk),
          subjectMatter: resp.subjects.map(sub => sub.pk),
        }
      }
      return x;
    })
  },
  getNoteFacts(state, resp) {
    state.dataNotesFacts = resp.results;
    state.totalsNoteFacts = resp.count
  },
  createNoteFact(state, resp) {
    state.dataNotesFacts = [...state.dataNotesFacts, resp];
  },
  removeNoteFact(state, resp) {
    state.dataNotesFacts = state.dataNotesFacts.filter(x => x.pk !== resp.noteId);
  },
  editNoteFact(state, resp) {
    state.dataNotesFacts = state.dataNotesFacts.map(x => {
      if (x.pk === resp.pk) {
        return { ...x, ...resp }
      }
      return x;
    })
  },

  createFactAttachment(state, resp) {
    state.dataAttachment = state.dataAttachment.concat(resp.attachments);
  },
  removeFactAttachment(state, resp) {
    state.dataAttachment = state.dataAttachment.filter(x => x.pk !== resp.attachmentId);
  },
  getFactAttachment(state, resp) {
    state.dataAttachment = resp.results;
    state.totalsAttachment = resp.count;
  },
  moveRows(state, data) {
    const item = state.dataFactsReSearch.dataTableFacts.find(
      x => x.id === parseInt(data.idDragging)
    );
    item.characters = item.characters.filter(
      id => id !== parseInt(data.fromId)
    );
    if (!item.characters.some(id => id === parseInt(data.toId))) {
      item.characters.push(parseInt(data.toId));
    }
  },
  removeIssueSuccess(state, data) {
    let fact = state.dataFactsReSearch.dataTableFacts.find(
      x => x.id === data.taskId
    );
    fact.issue = fact.issue.filter(x => x !== data.newValue);
  },
  getCommentFacts(state, resp) {
    state.dataComment = resp.results;
    state.totalsComment = resp.count;
  },
  sendCommentFacts(state, resp) {
    state.dataComment = [resp, ...state.dataComment]
  },
  getDataFactsDetail(state, resp) {
    state.dataFactsDetail = resp;
  },
  updateFactsDetail(state, resp) {
    state.dataFactsDetail = resp
  },
  // Support Facts
  getSupportFacts(state, resp) {
    state.dataFactsSupport = resp.results;
    state.total_support = resp.count;
  },
  postSupportFacts(state, resp) {
    state.dataFactsSupport = [{ ...resp, list: [] }, ...state.dataFactsSupport];
    state.total_support++;
  },
  updateSupportFacts(state, resp) {
    state.dataFactsSupport = state.dataFactsSupport.map(x => {
      if (x.pk === resp.pk) {
        return { ...x, ...resp }
      }
      return x;
    })
  },
  removeSupportFacts(state, resp) {
    state.dataFactsSupport = state.dataFactsSupport.filter(x => x.pk !== resp.supportId);
    state.total_support--;
  },
  // Sub Support
  postSubFactsSupport(state, resp) {
    state.dataFactsSupport = state.dataFactsSupport.map(x => {
      if (x.id === resp.request.supportId) {
        return {
          ...x,
          list: [...x.list, { ...resp.result, id: resp.result.pk }]
        }
      }
      return x;
    })
  },
  updateSubFactsSupport(state, resp) {
    state.dataFactsSupport = state.dataFactsSupport.map(x => {
      if (x.id === resp.request.supportId) {
        return {
          ...x,
          list: x.list.map(m => {
            if (m.id === resp.request.itemId) {
              return { ...m, ...resp.request.body }
            }
            return m;
          })
        }
      }
      return x;
    })
  },
  removeSubFactsSupport(state, resp) {
    state.dataFactsSupport = state.dataFactsSupport.map(x => {
      if (x.pk === resp.supportId) {
        return {
          ...x,
          list: x.list.filter(m => m.pk !== resp.itemId)
        }
      }
      return x;
    })
  },
  updateCharactersSupport(state, response) {
    if (response.request.type === 'remove') {
      state.dataFactsSupport = state.dataFactsSupport.map(x => {
        if (x.pk === response.request.supportId) {
          return {
            ...x,
            list: x.list.map(m => {
              if (m.pk === response.request.itemId) {
                return {
                  ...m,
                  characters: m.characters.filter(f => f !== response.request.characterId)
                }
              }
              return m;
            })
          }
        }
        return x;
      })
    } else if (response.request.type === 'add') {
      state.dataFactsSupport = state.dataFactsSupport.map(x => {
        if (x.pk === response.request.supportId) {
          return {
            ...x,
            list: x.list.map(m => {
              if (m.pk === response.request.itemId) {
                return {
                  ...m,
                  characters: response.request.characterId
                }
              }
              return m;
            })
          }
        }
        return x;
      })
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    detail,
    factsGrid,
    comparing
  }
};
