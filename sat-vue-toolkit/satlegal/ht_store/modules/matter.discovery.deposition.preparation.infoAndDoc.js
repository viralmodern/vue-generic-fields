import api from "../../api/matter.discovery.deposition.preparation.infoAndDoc";
import { getLoadingSlickTable, arrayMove } from "../../utils";

const state = {
  dataInfoAndDoc: {},
  isLoadingGet: {},
};
const getters = {
  dataInfoAndDoc: state => state.dataInfoAndDoc,
  isLoadingGet: state => state.isLoadingGet,
};

const actions = {
  async getDataInfoAndDocRequest({ commit }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataInfoAndDoc(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    commit("getDataInfoAndDoc", result);
    return result;
  },
  async addInfoAndDocRequest({ commit }, data = {}) {
    const result = await api.addInfoAndDoc(data);
    commit("addInfoAndDoc", {name: data.name, result});
    return result;
  },
  async updateInfoAndDocRequest({ commit }, data) {
    api.updateInfoAndDoc(data);
    const map = {
      drag: data.drag,
      result: { id: data.idParams.infoAndDocId, ...data.body }
    };
    commit("updateInfoAndDoc", map);
  },
  async updateInfoAndDocGroupRequest({ commit }, data) {
    api.updateInfoAndDoc(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.infoAndDocId, ...data.body }
    };
    commit("updateInfoAndDocGroup", map);
  },
  async updateInfoAndDocAsyncRequest({ commit }, data) {
    const result = await api.updateInfoAndDoc(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.infoAndDocId, ...result }
    };
    commit("updateInfoAndDoc", map);
  },
  async removeInfoAndDocRequest({ commit }, data) {
    const result = await api.removeInfoAndDoc(data);
    commit("removeInfoAndDoc", data);
    return result;
  }
};

const mutations = {
  getDataInfoAndDoc(state, data) {
    state.dataInfoAndDoc = {...state.dataInfoAndDoc, ...data};
  },
  addInfoAndDoc(state, {name, result}) {
    state.dataInfoAndDoc[name].list.push(result);
    state.dataInfoAndDoc[name].totals++;
  },
  updateInfoAndDoc(state, { drag, result }) {
    if (drag) {
      const fromStage = state.dataInfoAndDoc[drag.fromListId].list;
      if (drag.toListId) {
        const toStage = state.dataInfoAndDoc[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataInfoAndDoc[drag.fromListId].totals--;
        state.dataInfoAndDoc[drag.toListId].totals++;
      } else {
        arrayMove(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      for (const key in state.dataInfoAndDoc) {
        state.dataInfoAndDoc[key].list = state.dataInfoAndDoc[key].list.map(x => {
          if(x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        })
      }
    }
  },
  updateCommentInInfoAndDoc(state, data) {
    for (const key in state.dataInfoAndDoc) {
      state.dataInfoAndDoc[key].list = state.dataInfoAndDoc[key].list.map(x => {
        if(x.id === data.infoAndDocId) {
          const comment = [...x.comment, data.comment];
          return {...x, comment};
        }
        return x;
      })
    }
  },
  removeInfoAndDoc(state, { name, infoAndDocId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataInfoAndDoc) {
        state.dataInfoAndDoc[key].list = state.dataInfoAndDoc[
          key
        ].list.filter(x => x.id !== infoAndDocId);
        state.dataInfoAndDoc[key].totals--;
      }
    } else {
      state.dataInfoAndDoc[name].list = state.dataInfoAndDoc[
        name
      ].list.filter(x => x.id !== infoAndDocId);
      state.dataInfoAndDoc[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  clearData(state) {
    state.dataInfoAndDoc = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

