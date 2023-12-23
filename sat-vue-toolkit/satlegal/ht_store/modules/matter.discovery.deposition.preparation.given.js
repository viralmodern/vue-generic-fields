import api from "../../api/matter.discovery.deposition.preparation.given";
import { getLoadingSlickTable, arrayMove } from "../../utils";

const state = {
  dataGiven: {},
  isLoadingGet: {},
};
const getters = {
  dataGiven: state => state.dataGiven,
  isLoadingGet: state => state.isLoadingGet,
};

const actions = {
  async getDataGivenRequest({ commit }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataGiven(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    commit("getDataGiven", result);
    return result;
  },
  async addGivenRequest({ commit }, data = {}) {
    const result = await api.addGiven(data);
    commit("addGiven", {name: data.name, result});
    return result;
  },
  async updateGivenRequest({ commit }, data) {
    api.updateGiven(data);
    const map = {
      drag: data.drag,
      result: { id: data.idParams.givenId, ...data.body }
    };
    commit("updateGiven", map);
  },
  async updateGivenGroupRequest({ commit }, data) {
    api.updateGiven(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.givenId, ...data.body }
    };
    commit("updateGivenGroup", map);
  },
  async updateGivenAsyncRequest({ commit }, data) {
    const result = await api.updateGiven(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.givenId, ...result }
    };
    commit("updateGiven", map);
  },
  async removeGivenRequest({ commit }, data) {
    const result = await api.removeGiven(data);
    commit("removeGiven", data);
    return result;
  }
};

const mutations = {
  getDataGiven(state, data) {
    state.dataGiven = {...state.dataGiven, ...data};
  },
  addGiven(state, {name, result}) {
    state.dataGiven[name].list.push(result);
    state.dataGiven[name].totals++;
  },
  updateGiven(state, { drag, result }) {
    if (drag) {
      const fromStage = state.dataGiven[drag.fromListId].list;
      if (drag.toListId) {
        const toStage = state.dataGiven[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataGiven[drag.fromListId].totals--;
        state.dataGiven[drag.toListId].totals++;
      } else {
        arrayMove(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      for (const key in state.dataGiven) {
        state.dataGiven[key].list = state.dataGiven[key].list.map(x => {
          if(x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        })
      }
    }
  },
  updateCommentInGiven(state, data) {
    for (const key in state.dataGiven) {
      state.dataGiven[key].list = state.dataGiven[key].list.map(x => {
        if(x.id === data.givenId) {
          const comment = [...x.comment, data.comment];
          return {...x, comment};
        }
        return x;
      })
    }
  },
  removeGiven(state, { name, givenId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataGiven) {
        state.dataGiven[key].list = state.dataGiven[
          key
        ].list.filter(x => x.id !== givenId);
        state.dataGiven[key].totals--;
      }
    } else {
      state.dataGiven[name].list = state.dataGiven[
        name
      ].list.filter(x => x.id !== givenId);
      state.dataGiven[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  clearData(state) {
    state.dataGiven = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

