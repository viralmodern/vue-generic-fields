import api from "../../api/matter.patient.profile.detail.prescribes.detail.sideEffects";

const state = {
  dataSideEffects: []
};
const getters = {
  dataSideEffects: state => state.dataSideEffects
};

const actions = {
  async getDataSideEffectsRequest({ commit }) {
    const result = await api.getDataSideEffects();
    commit("getDataSideEffects", result);
    return result;
  },
  async addSideEffectsRequest({ commit }, data) {
    const result = await api.addSideEffects(data);
    result.id = Math.random();
    result.characters = [];
    result.facts = [];
    result.citations = [];
    commit("addSideEffects", result);
    return result;
  },
  updateSideEffectsRequest({ commit }, data) {
    api.updateSideEffects(data);
    commit("updateSideEffects", data);
  },
  async removeSideEffectsRequest({ commit }, data) {
    const result = await api.removeSideEffects(data);
    commit("removeSideEffects", result);
    return result;
  }
};

const mutations = {
  getDataSideEffects(state, data) {
    state.dataSideEffects = data;
  },
  addSideEffects(state, data) {
    state.dataSideEffects.unshift(data);
  },
  updateSideEffects(state, data) {
    state.dataSideEffects = state.dataSideEffects.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeSideEffects(state, id) {
    state.dataSideEffects = state.dataSideEffects.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
