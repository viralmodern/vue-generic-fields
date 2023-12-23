import api from "../../api/matter.partient.profile.detail.agreementDetail.highlight";

const state = {
  dataHighlight: []
};
const getters = {
  dataHighlight: state => state.dataHighlight
};

const actions = {
  async getDataHighlightRequest({ commit }) {
    const result = await api.getDataHighlight();
    commit("getDataHighlight", result);
    return result;
  },
  async addHighlightRequest({ commit }, data) {
    const result = await api.addHighlight(data);
    result.id = Math.random();
    commit("addHighlight", result);
    return result;
  },
  updateHighlightRequest({ commit }, data) {
    api.updateHighlight(data);
    commit("updateHighlight", data);
  },
  async removeHighlightRequest({ commit }, data) {
    const result = await api.removeHighlight(data);
    commit("removeHighlight", result);
    return result;
  }
};

const mutations = {
  getDataHighlight(state, data) {
    state.dataHighlight = data;
  },
  addHighlight(state, data) {
    state.dataHighlight.unshift(data);
  },
  updateHighlight(state, data) {
    state.dataHighlight = state.dataHighlight.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeHighlight(state, id) {
    state.dataHighlight = state.dataHighlight.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
