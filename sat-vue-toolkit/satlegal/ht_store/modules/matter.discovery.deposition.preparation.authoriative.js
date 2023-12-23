import api from "../../api/matter.discovery.deposition.preparation.authoriative";
import { getLoadingSlickTable, arrayMove } from "../../utils";

const state = {
  dataAuthoriative: {},
  isLoadingGet: {},
};
const getters = {
  dataAuthoriative: state => state.dataAuthoriative,
  isLoadingGet: state => state.isLoadingGet,
};

const actions = {
  async getDataAuthoriativeRequest({ commit }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataAuthoriative(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    commit("getDataAuthoriative", result);
    return result;
  },
  async addAuthoriativeRequest({ commit }, data = {}) {
    const result = await api.addAuthoriative(data);
    commit("addAuthoriative", {name: data.name, result});
    return result;
  },
  async updateAuthoriativeRequest({ commit }, data) {
    api.updateAuthoriative(data);
    const map = {
      drag: data.drag,
      result: { id: data.idParams.authoriativeId, ...data.body }
    };
    commit("updateAuthoriative", map);
  },
  async updateAuthoriativeGroupRequest({ commit }, data) {
    api.updateAuthoriative(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.authoriativeId, ...data.body }
    };
    commit("updateAuthoriativeGroup", map);
  },
  async removeAuthoriativeRequest({ commit }, data) {
    const result = await api.removeAuthoriative(data);
    commit("removeAuthoriative", data);
    return result;
  }
};

const mutations = {
  getDataAuthoriative(state, data) {
    state.dataAuthoriative = {...state.dataAuthoriative, ...data};
  },
  addAuthoriative(state, {name, result}) {
    state.dataAuthoriative[name].list.push(result);
    state.dataAuthoriative[name].totals++;
  },
  updateAuthoriative(state, { drag, result }) {
    if (drag) {
      const fromStage = state.dataAuthoriative[drag.fromListId].list;
      if (drag.toListId) {
        const toStage = state.dataAuthoriative[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataAuthoriative[drag.fromListId].totals--;
        state.dataAuthoriative[drag.toListId].totals++;
      } else {
        arrayMove(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      for (const key in state.dataAuthoriative) {
        state.dataAuthoriative[key].list = state.dataAuthoriative[key].list.map(x => {
          if(x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        })
      }
    }
  },
  updateCommentInAuthoriative(state, data) {
    for (const key in state.dataAuthoriative) {
      state.dataAuthoriative[key].list = state.dataAuthoriative[key].list.map(x => {
        if(x.id === data.authoriativeId) {
          const comment = [...x.comment, data.comment];
          return {...x, comment};
        }
        return x;
      })
    }
  },
  removeAuthoriative(state, { name, authoriativeId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataAuthoriative) {
        state.dataAuthoriative[key].list = state.dataAuthoriative[
          key
        ].list.filter(x => x.id !== authoriativeId);
        state.dataAuthoriative[key].totals--;
      }
    } else {
      state.dataAuthoriative[name].list = state.dataAuthoriative[
        name
      ].list.filter(x => x.id !== authoriativeId);
      state.dataAuthoriative[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  clearData(state) {
    state.dataAuthoriative = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

