import api from "../../api/matter.discovery.deposition.preparation.requestForProduction";
import {$$STORE_PREFIX, getLoadingSlickTable} from "../../utils";

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

const state = {
  dataRFP: {},
  dataAttachments: [],
  dataNotes: [],
  isLoadingGet: {},
  countAttachments: 0,
  countNotes: 0,
};
const getters = {
  dataRFP: state => state.dataRFP,
  dataAttachments: state => state.dataAttachments,
  dataNotes: (state, _, __, rootGetters) => {
    const matterMembers = rootGetters['ht_store/project/members/members'];
    const dataMap = state.dataNotes.map(x => {
      const findMembers = matterMembers.find(member => member.id === x.creator) || {};
      let member = {};
      if (findMembers.avatar) {
        member = {
          avatar: findMembers.avatar.imageUrl,
          peopleWrite: findMembers.avatar.name,
        };
      }
      return {
        ...x,
        ...member,
      };
    })
    return dataMap;
  },
  isLoadingGet: state => state.isLoadingGet,
  totalsPageAttachment: state => Math.ceil(state.countAttachments / 20),
  totalsPageNote: state => Math.ceil(state.countNotes / 20),
  isShowPagination: (state, getters) => (getters.totalsPageAttachment || 0) > 1,
  isShowPaginationNotes: (state, getters) => (getters.totalsPageNote || 0) > 1,
};

const actions = {
  async getDataRFPRequest({ commit }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataRFP(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    commit("getDataRFP", result);
    return result;
  },

  async getDataAttachmentRFPRequest({ commit }, data = {}) {
    const result = await api.getDataAttachmentRFP(data);
    commit("getDataAttachmentRFP", result);
    return result;
  },

  async getDataNotesRFPRequest({ commit }, data = {}) {
    const result = await api.getDataNotesRFP(data);
    commit("getDataNoteRFP", result);
    return result;
  },

  async addRFPRequest({ commit }, data = {}) {
    const result = await api.addRFP(data);
    commit("addRFP", {name: data.name, result});
    return result;
  },

  async addAttachmentRFPRequest({ commit }, data = {}) {
    const result = await api.addAttachmentRFP(data);
    commit("updateAttachmentInRFP", {RFPId: data.idParams.RFPId, attachments: result.attachments});
    return result;
  },

  async addNotesRFPRequest({ commit }, data = {}) {
    const result = await api.addNotesRFP(data);
    console.log(result, 'action')
    commit("updateNotesInRFP", {RFPId: data.idParams.RFPId, notes: result});
    return result;
  },

  async updateRFPRequest({ commit }, data) {
    api.updateRFP(data);
    const map = {
      drag: data.drag,
      result: { id: data.idParams.RFPId, ...data.body }
    };
    commit("updateRFP", map);
  },

  async updateAttachmentRFPRequest(_, data = {}) {
    const result = await api.updateAttachmentRFP(data);
    return result;
  },

  async updateNotesRFPRequest(_, data = {}) {
    const result = await api.updateNotesRFP(data);
    return result;
  },

  async updateRFPGroupRequest({ commit }, data) {
    api.updateRFP(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.RFPId, ...data.body }
    };
    commit("updateRFPGroup", map);
  },

  async removeRFPRequest({ commit }, data) {
    const result = await api.removeRFP(data);
    commit("removeRFP", data);
    return result;
  },

  async removeAttachmentRFPRequest({ commit }, data) {
    const result = api.removeAttachmentRFP(data);
    commit("removeAttachmentInRFP", {RFPId: data.RFPId, attachmentId: data.attachmentId});
    return result;
  },

  async removeNotesRFPRequest({ commit }, data) {
    const result = await api.removeNotesRFP(data);
    commit("removeNotesInRFP", {RFPId: data.RFPId, noteId: data.noteId});
    return result;
  }
};

const mutations = {
  getDataRFP(state, data) {
    state.dataRFP = {...state.dataRFP, ...data};
  },

  getDataAttachmentRFP(state, data) {
    state.dataAttachments = data.results;
    state.countAttachments = data.count;
  },

  getDataNoteRFP(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },

  addRFP(state, {name, result}) {
    state.dataRFP[name].list.push(result);
    state.dataRFP[name].totals++;
  },

  updateRFP(state, { drag, result }) {
    if (drag) {
      const fromStage = state.dataRFP[drag.fromListId].list;
      if (drag.toListId) {
        const toStage = state.dataRFP[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataRFP[drag.fromListId].totals--;
        state.dataRFP[drag.toListId].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      for (const key in state.dataRFP) {
        state.dataRFP[key].list = state.dataRFP[key].list.map(x => {
          if(x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        })
      }
    }
  },

  updateAttachmentInRFP(state, data) {
    for (const key in state.dataRFP) {
      state.dataRFP[key].list = state.dataRFP[key].list.map(x => {
        if(x.id === data.RFPId) {
          const attachments = [...x.attachments, ...data.attachments];
          return {...x, attachments};
        }
        return x;
      })
    }
  },

  updateNotesInRFP(state, data) {
    console.log(data, 1)
    for (const key in state.dataRFP) {
      state.dataRFP[key].list = state.dataRFP[key].list.map(x => {
        if(x.id === data.RFPId) {
          const notes = [...x.notes, data.notes];
          return {...x, notes};
        }
        return x;
      })
    }
  },

  removeRFP(state, { name, RFPId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataRFP) {
        state.dataRFP[key].list = state.dataRFP[
          key
        ].list.filter(x => x.id !== RFPId);
        state.dataRFP[key].totals--;
      }
    } else {
      state.dataRFP[name].list = state.dataRFP[
        name
      ].list.filter(x => x.id !== RFPId);
      state.dataRFP[name].totals--;
    }
  },

  removeAttachmentInRFP(state, data) {
    for (const key in state.dataRFP) {
      state.dataRFP[key].list = state.dataRFP[key].list.map(x => {
        if(x.id === data.RFPId) {
          const attachments = x.attachments.filter(attachment => attachment.pk !== data.attachmentId);
          return {...x, attachments};
        }
        return x;
      })
    }
  },

  removeNotesInRFP(state, data) {
    for (const key in state.dataRFP) {
      state.dataRFP[key].list = state.dataRFP[key].list.map(x => {
        if(x.id === data.RFPId) {
          const notes = x.notes.filter(note => note.pk !== data.noteId);
          return {...x, notes};
        }
        return x;
      })
    }
  },

  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  clearData(state) {
    state.dataRFP = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

