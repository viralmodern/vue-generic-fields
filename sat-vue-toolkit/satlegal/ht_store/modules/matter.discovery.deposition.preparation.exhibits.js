import api from "../../api/matter.discovery.deposition.preparation.exhibits";
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
  dataExhibits: {},
  dataComment: [],
  isLoadingGet: {},
  countComment: 0,
};
const getters = {
  dataExhibits: state => state.dataExhibits,
  dataComment: state => state.dataComment,
  isLoadingGet: state => state.isLoadingGet,
  totalsPageComment: state => Math.ceil(state.countComment / 20),
  isShowPaginationComment: (state, getters) => (getters.totalsPageComment || 0) > 1,
  countComment: state => state.countComment,
};

const actions = {
  async getDataExhibitsRequest({ commit }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataExhibits(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    commit("getDataExhibits", result);
    return result;
  },
  async getDataCommentExhibitsRequest({ commit }, data = {}) {
    const result = await api.getDataCommentExhibits(data);
    commit("getDataCommentExhibits", result);
    return result;
  },
  async addCommentExhibitsRequest({ commit }, data = {}) {
    const result = await api.addCommentExhibits(data);
    commit("updateCommentInExhibits", {exhibitsId: data.idParams.exhibitsId, comment: result});
    return result;
  },
  async addExhibitsRequest({ commit }, data = {}) {
    const result = await api.addExhibits(data);
    commit("addExhibits", {name: data.name, result});
    return result;
  },
  async updateExhibitsRequest({ commit }, data) {
    api.updateExhibits(data);
    const map = {
      drag: data.drag,
      result: { id: data.idParams.exhibitsId, ...data.body }
    };
    commit("updateExhibits", map);
  },
  async updateExhibitsGroupRequest({ commit }, data) {
    api.updateExhibits(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.exhibitsId, ...data.body }
    };
    commit("updateExhibitsGroup", map);
  },
  async updateExhibitsAsyncRequest({ commit }, data) {
    const result = await api.updateExhibits(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.exhibitsId, ...result }
    };
    commit("updateExhibits", map);
  },
  async removeExhibitsRequest({ commit }, data) {
    const result = await api.removeExhibits(data);
    commit("removeExhibits", data);
    return result;
  }
};

const mutations = {
  getDataExhibits(state, data) {
    state.dataExhibits = {...state.dataExhibits, ...data};
  },
  getDataCommentExhibits(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },
  addExhibits(state, {name, result}) {
    state.dataExhibits[name].list.push(result);
    state.dataExhibits[name].totals++;
  },
  updateExhibits(state, { drag, result }) {
    if (drag) {
      const fromStage = state.dataExhibits[drag.fromListId].list;
      if (drag.toListId) {
        const toStage = state.dataExhibits[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataExhibits[drag.fromListId].totals--;
        state.dataExhibits[drag.toListId].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      for (const key in state.dataExhibits) {
        state.dataExhibits[key].list = state.dataExhibits[key].list.map(x => {
          if(x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        })
      }
    }
  },
  updateCommentInExhibits(state, data) {
    for (const key in state.dataExhibits) {
      state.dataExhibits[key].list = state.dataExhibits[key].list.map(x => {
        if(x.id === data.exhibitsId) {
          const comment = [...x.comment, data.comment];
          return {...x, comment};
        }
        return x;
      })
    }
  },
  removeExhibits(state, { name, exhibitsId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataExhibits) {
        state.dataExhibits[key].list = state.dataExhibits[
          key
        ].list.filter(x => x.id !== exhibitsId);
        state.dataExhibits[key].totals--;
      }
    } else {
      state.dataExhibits[name].list = state.dataExhibits[
        name
      ].list.filter(x => x.id !== exhibitsId);
      state.dataExhibits[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  clearData(state) {
    state.dataExhibits = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

