import api from "../../api/matter.RACI";

const state = {
  dataMatterRACI: []
};
const getters = {
  dataMatterRACI: state => state.dataMatterRACI
};

const actions = {
  async getDataMatterRACIRequest({ commit }) {
    const result = await api.getDataMatterRACI();
    commit("getDataMatterRACI", result);
    return result;
  }
};

const mutations = {
  getDataMatterRACI(state, data) {
    state.dataMatterRACI = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
