import api from "../../api/workspace.client.detail.overview";

const state = {
  overview: [],
  activities: []
};
const getters = {
  overview: state => state.overview,
  activities: state => state.activities
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
  },
  async getDataActivities({ commit }, id) {
    commit('getDataActivities', await api.getDataActivities(id));
  }
};

const mutations = {
  getDataActivities(state, activities) {
    state.activities = activities
  },
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
