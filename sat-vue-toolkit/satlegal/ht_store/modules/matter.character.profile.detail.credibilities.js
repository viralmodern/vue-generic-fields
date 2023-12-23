import api from "../../api/matter.character.detail.credibilities";

const state = {
  credibilities: []
};
const getters = {
  credibilities: state => state.credibilities
};

const actions = {
  async getDataCredibilitiesRequest({ commit }) {
    commit("getDataCredibilities", await api.getDataCredibilities());
  }
};

const mutations = {
  getDataCredibilities(state, data) {
    state.credibilities = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
