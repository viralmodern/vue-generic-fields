import api from "../../api/matter.discovery.deposition.preparation.priorStatement";
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
  dataPriorStatement: {},
  dataComment: [],
  isLoadingGet: {},
  countComment: 0,
};
const getters = {
  dataPriorStatement: state => state.dataPriorStatement,
  dataComment: state => state.dataComment,
  isLoadingGet: state => state.isLoadingGet,
  totalsPageComment: state => Math.ceil(state.countComment / 20),
  isShowPaginationComment: (state, getters) => (getters.totalsPageComment || 0) > 1,
  countComment: state => state.countComment,
};

const actions = {
  async getDataPriorStatementRequest({ commit }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataPriorStatement(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    commit("getDataPriorStatement", result);
    return result;
  },
  async getDataCommentPriorStatementRequest({ commit }, data = {}) {
    const result = await api.getDataCommentPriorStatement(data);
    commit("getDataCommentPriorStatement", result);
    return result;
  },
  async addPriorStatementRequest({ commit }, data = {}) {
    const result = await api.addPriorStatement(data);
    commit("addPriorStatement", { name: data.name, result });
    return result;
  },
  async addCommentPriorStatementRequest({ commit }, data = {}) {
    const result = await api.addCommentPriorStatement(data);
    commit("updateCommentInPriorStatement", {priorStatementId: data.idParams.priorStatementId, comment: result});
    return result;
  },
  async updatePriorStatementRequest({ commit }, data) {
    api.updatePriorStatement(data);
    const map = {
      drag: data.drag,
      result: { id: data.idParams.priorStatementId, ...data.body }
    };
    commit("updatePriorStatement", map);
  },
  async updatePriorStatementGroupRequest({ commit }, data) {
    api.updatePriorStatement(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.priorStatementId, ...data.body }
    };
    commit("updatePriorStatementGroup", map);
  },
  async removePriorStatementRequest({ commit }, data) {
    const result = await api.removePriorStatement(data);
    commit("removePriorStatement", data);
    return result;
  }
};

const mutations = {
  getDataPriorStatement(state, data) {
    state.dataPriorStatement = {...state.dataPriorStatement, ...data};
  },
  getDataCommentPriorStatement(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },
  addPriorStatement(state, { name, result }) {
    state.dataPriorStatement[name].list.push(result);
    state.dataPriorStatement[name].totals++;
  },
  updatePriorStatement(state, { drag, result }) {
    if (drag) {
      const fromStage = state.dataPriorStatement[drag.fromListId].list;
      if (drag.toListId) {
        const toStage = state.dataPriorStatement[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataPriorStatement[drag.fromListId].totals--;
        state.dataPriorStatement[drag.toListId].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      for (const key in state.dataPriorStatement) {
        state.dataPriorStatement[key].list = state.dataPriorStatement[key].list.map(x => {
          if(x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        })
      }
    }
  },
  updateCommentInPriorStatement(state, data) {
    for (const key in state.dataPriorStatement) {
      state.dataPriorStatement[key].list = state.dataPriorStatement[key].list.map(x => {
        if(x.id === data.priorStatementId) {
          const comment = [...x.comment, data.comment];
          return {...x, comment};
        }
        return x;
      })
    }
  },
  removePriorStatement(state, { name, priorStatementId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataPriorStatement) {
        state.dataPriorStatement[key].list = state.dataPriorStatement[
          key
        ].list.filter(x => x.id !== priorStatementId);
        state.dataPriorStatement[key].totals--;
      }
    } else {
      state.dataPriorStatement[name].list = state.dataPriorStatement[
        name
      ].list.filter(x => x.id !== priorStatementId);
      state.dataPriorStatement[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  clearData(state) {
    state.dataPriorStatement = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
