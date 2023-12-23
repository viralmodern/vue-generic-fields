import api from "../../api/workspace-logType";

const state = {
  types: []
};
const getters = {
  types: state => state.types
};

const actions = {
  async getLogTypeRequest({ commit }) {
    commit("getLogType", await api.getDataLogType());
  }
};

const mutations = {
  getLogType(state, data) {
    state.types = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
