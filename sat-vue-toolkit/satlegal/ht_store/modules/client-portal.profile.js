import api from "../../api/client-portal.profile";

const state = {
  overview: [],
};
const getters = {
  overview: state => state.overview,
};

const actions = {
  async getDataOverViewRequest({ commit }) {
    commit("getDataOverViewRequest", await api.getDataOverView());
  },
  async updateGeneralInfo({ commit }, data) {
    commit("updateGeneralInfo", data, await api.updateGeneralInfo(data))
  },
  async updateWork({ commit }, data) {
    commit("updateWork", data, await api.updateWork(data))
  },
  async updateContact({ commit }, data) {
    commit("updateContact", data, await api.updateContact(data))
  }
};

const mutations = {
  getDataOverViewRequest(state, overview) {
    state.overview = overview
  },
  updateGeneralInfo(state, data) {
    state.overview.dataGeneralInfo = { ...data };
  },
  updateWork(state, data) {
    state.overview.dataWork = { ...data }
  },
  updateContact(state, data) {
    state.overview.dataContact = { ...data }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
