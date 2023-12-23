import api from "../../api/matter.references.highlight";

const state = {
  dataHighlight: []
};

const getters = {
  dataHighlight: state => state.dataHighlight
};

const actions = {
  async getDataHighlightRequest({ commit }, data = {}) {
    commit("getDataHighlight", await api.getDataHighlight(data));
  },
  async addHighlightRequest({ commit }, data = {}) {
    const result = await api.addHighlight(data);
    commit("addHighlight", result)
  },
  async updateHighlightRequest({ commit }, data = {}) {
    const result = await api.updateHighlight(data);
    commit("updateHighlight", result)
  },
  async removeHighlightRequest({ commit }, data = {}) {
    api.removeHighlight(data);
    commit("removeHighlight", data.id)
  },
};

const mutations = {
  getDataHighlight(state, data) {
    state.dataHighlight = data;
  },
  addHighlight(state, data) {
    state.dataHighlight = [...state.dataHighlight, data]
  },
  updateHighlight(state, data) {

    state.dataHighlight = state.dataHighlight.map(x => {
      if (x.id === data.id) {
        x[data.column] = data.value;
        return x;
      }
      return x;
    });
  },
  removeHighlight(state, id) {
    state.dataHighlight = state.dataHighlight.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
