import api from "../../api/workspace-favorable";

const state = {
  favorable: []
};
const getters = {
  favorable: state => state.favorable
};

const actions = {
  async getFavorableRequest({ commit }) {
    commit('getFavorable', await api.getDataFavorable())
  }
};

const mutations = {
  getFavorable(state, data) {
    state.favorable = data
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
