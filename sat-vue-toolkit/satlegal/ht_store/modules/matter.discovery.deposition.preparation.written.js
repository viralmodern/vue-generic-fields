import api from "../../api/matter.discovery.deposition.preparation.written";
import { getLoadingSlickTable, arrayMove } from "../../utils";

const state = {
  dataWritten: {},
  isLoadingGet: {},
};
const getters = {
  dataWritten: state => state.dataWritten,
  isLoadingGet: state => state.isLoadingGet,
};

const actions = {
  async getDataWrittenRequest({ commit }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataWritten(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    commit("getDataWritten", result);
    return result;
  },
  async addWrittenRequest({ commit }, data = {}) {
    const result = await api.addWritten(data);
    commit("addWritten", {name: data.name, result});
    return result;
  },
  async updateWrittenRequest({ commit }, data) {
    api.updateWritten(data);
    const map = {
      drag: data.drag,
      result: { id: data.idParams.writtenId, ...data.body }
    };
    commit("updateWritten", map);
  },
  async updateWrittenAsyncRequest({ commit }, data) {
    const result = await api.updateWritten(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.writtenId, ...result }
    };
    commit("updateWritten", map);
  },
  async removeWrittenRequest({ commit }, data) {
    const result = await api.removeWritten(data);
    commit("removeWritten", data);
    return result;
  }
};

const mutations = {
  getDataWritten(state, data) {
    state.dataWritten = {...state.dataWritten, ...data};
  },
  addWritten(state, {name, result}) {
    state.dataWritten[name].list.push(result);
    state.dataWritten[name].totals++;
  },
  updateWritten(state, { drag, result }) {
    if (drag) {
      const fromStage = state.dataWritten[drag.fromListId].list;
      if (drag.toListId) {
        const toStage = state.dataWritten[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataWritten[drag.fromListId].totals--;
        state.dataWritten[drag.toListId].totals++;
      } else {
        arrayMove(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      for (const key in state.dataWritten) {
        state.dataWritten[key].list = state.dataWritten[key].list.map(x => {
          if(x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        })
      }
    }
  },
  removeWritten(state, { name, writtenId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataWritten) {
        state.dataWritten[key].list = state.dataWritten[
          key
        ].list.filter(x => x.id !== writtenId);
        state.dataWritten[key].totals--;
      }
    } else {
      state.dataWritten[name].list = state.dataWritten[
        name
      ].list.filter(x => x.id !== writtenId);
      state.dataWritten[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  clearData(state) {
    state.dataWritten = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

