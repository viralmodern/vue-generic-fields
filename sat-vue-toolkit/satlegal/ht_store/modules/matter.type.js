import api from "../../api/matter.type";

const state = {
  types: []
};
const getters = {
  types: state => state.types
};

const actions = {
  async getDataMatterTypeRequest({ commit }) {
    commit("getDataMatterType", await api.getDataTypeMatter());
  }
};

const mutations = {
  getDataMatterType(state, data) {
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
