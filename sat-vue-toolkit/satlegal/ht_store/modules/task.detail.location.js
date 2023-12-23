import api from "../../api/task.detail";

const state = {
  dataLocation: []
};

const getters = {
  dataLocation: state => state.dataLocation
};

const actions = {
  async getDataLocationRequest({ commit }) {
    commit("getDataLocation", await api.getListLocation());
  }
};

const mutations = {
  getDataLocation(state, dataLocation) {
    state.dataLocation = dataLocation;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
