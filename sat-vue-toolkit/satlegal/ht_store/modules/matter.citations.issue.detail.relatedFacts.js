import api from "../../api/matter.citations.issue.detail.relatedFacts";

const state = {
  dataRelatedFacts: []
};
const getters = {
  dataRelatedFacts: state => state.dataRelatedFacts
};

const actions = {
  async getDataRelatedFactsRequest({ commit }) {
    const result = await api.getDataRelatedFacts();
    commit("getDataRelatedFacts", result);
    return result;
  },
  async addRelatedFactsRequest({ commit }, data) {
    const result = await api.addRelatedFacts(data);
    result.id = Math.random();
    result.characters = [];
    commit("addRelatedFacts", result);
    return result;
  },
  async updateRelatedFactsRequest({ commit }, data) {
    const result = await api.updateRelatedFacts(data);
    commit("updateRelatedFacts", result);
    return result;
  },
  async removeRelatedFactsRequest({ commit }, data) {
    const result = await api.removeRelatedFacts(data);
    commit("removeRelatedFacts", result);
    return result;
  }
};

const mutations = {
  getDataRelatedFacts(state, data) {
    state.dataRelatedFacts = data;
  },
  addRelatedFacts(state, data) {
    state.dataRelatedFacts.unshift(data);
  },
  updateRelatedFacts(state, data) {
    state.dataRelatedFacts = state.dataRelatedFacts.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeRelatedFacts(state, id) {
    state.dataRelatedFacts = state.dataRelatedFacts.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
