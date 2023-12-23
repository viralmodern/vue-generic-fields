import api from "../../api/project.filing.version";

const state = {
  version: []
};

// getters
const getters = {
  version: state => state.version
};

// actions
const actions = {
  async getVersionRequest({ commit }) {
    commit("getVersion", await api.getDataVersion());
  }
};

// mutations
const mutations = {
  getVersion(state, data) {
    state.version = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
