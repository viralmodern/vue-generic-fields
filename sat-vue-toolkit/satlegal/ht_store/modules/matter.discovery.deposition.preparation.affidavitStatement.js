import api from "../../api/matter.discovery.deposition.preparation.affidavitStatement";
import { getLoadingSlickTable } from "../../utils";

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
  dataAffidavitStatement: {},
  dataComment: [],
  isLoadingGet: {},
  countComment: 0,
};
const getters = {
  dataAffidavitStatement: state => state.dataAffidavitStatement,
  dataComment: state => state.dataComment,
  isLoadingGet: state => state.isLoadingGet,
  totalsPageComment: state => Math.ceil(state.countComment / 20),
  isShowPaginationComment: (state, getters) => (getters.totalsPageComment || 0) > 1,
  countComment: state => state.countComment,
};

const actions = {
  async getDataAffidavitStatementRequest({ commit }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataAffidavitStatement(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    commit("getDataAffidavitStatement", result);
    return result;
  },
  async getDataCommentAffsRequest({ commit }, data = {}) {
    const result = await api.getDataCommentAffs(data);
    commit("getDataCommentAffs", result);
    return result;
  },
  async addAffidavitStatementRequest({ commit }, data = {}) {
    const result = await api.addAffidavitStatement(data);
    commit("addAffidavitStatement", {name: data.name, result});
    return result;
  },
  async addCommentAffsRequest({ commit }, data = {}) {
    const result = await api.addCommentAffs(data);
    commit("updateCommentInAffs", {affsId: data.idParams.affsId, comment: result});
    return result;
  },
  async updateAffidavitStatementRequest({ commit }, data) {
    api.updateAffidavitStatement(data);
    const map = {
      drag: data.drag,
      result: { id: data.idParams.affidavitStatementId, ...data.body }
    };
    commit("updateAffidavitStatement", map);
  },
  async updateAffidavitStatementGroupRequest({ commit }, data) {
    api.updateAffidavitStatement(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.affidavitStatementId, ...data.body }
    };
    commit("updateAffidavitStatementGroup", map);
  },
  async removeAffidavitStatementRequest({ commit }, data) {
    const result = await api.removeAffidavitStatement(data);
    commit("removeAffidavitStatement", data);
    return result;
  }
};

const mutations = {
  getDataAffidavitStatement(state, data) {
    state.dataAffidavitStatement = {...state.dataAffidavitStatement, ...data};
  },
  getDataCommentAffs(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },
  addAffidavitStatement(state, {name, result}) {
    state.dataAffidavitStatement[name].list.push(result);
    state.dataAffidavitStatement[name].totals++;
  },
  updateAffidavitStatement(state, { drag, result }) {
    if (drag) {
      const fromStage = state.dataAffidavitStatement[drag.fromListId].list;
      if (drag.toListId) {
        const toStage = state.dataAffidavitStatement[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataAffidavitStatement[drag.fromListId].totals--;
        state.dataAffidavitStatement[drag.toListId].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      for (const key in state.dataAffidavitStatement) {
        state.dataAffidavitStatement[key].list = state.dataAffidavitStatement[key].list.map(x => {
          if(x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        })
      }
    }
  },
  updateCommentInAffs(state, data) {
    for (const key in state.dataAffidavitStatement) {
      state.dataAffidavitStatement[key].list = state.dataAffidavitStatement[key].list.map(x => {
        if(x.id === data.affsId) {
          const comment = [...x.comment, data.comment];
          return {...x, comment};
        }
        return x;
      })
    }
  },
  removeAffidavitStatement(state, { name, affidavitStatementId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataAffidavitStatement) {
        state.dataAffidavitStatement[key].list = state.dataAffidavitStatement[
          key
        ].list.filter(x => x.id !== affidavitStatementId);
        state.dataAffidavitStatement[key].totals--;
      }
    } else {
      state.dataAffidavitStatement[name].list = state.dataAffidavitStatement[
        name
      ].list.filter(x => x.id !== affidavitStatementId);
      state.dataAffidavitStatement[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  clearData(state) {
    state.dataAffidavitStatement = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

