import api from "../../api/matter.character.detail.about";

const state = {
  abouts: []
};
const getters = {
  abouts: state => state.abouts
};

const actions = {
  async getDataAboutRequest({ commit }) {
    commit("getDataAbout", await api.getDataAbout());
  }
};

const mutations = {
  getDataAbout(state, data) {
    state.abouts = data;
  },
  updateGeneralInfo(state, data) {
    state.abouts.dataGeneralInfo = { ...data };
  },
  updateWork(state, data) {
    state.abouts.dataWork = { ...data }
  },
  updateContact(state, data) {
    state.abouts.dataContact = { ...data }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
