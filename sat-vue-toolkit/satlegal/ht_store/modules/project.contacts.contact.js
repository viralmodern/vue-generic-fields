import api from '../../api/project.contacts.detail'

const state = {
  dataContact: {},
  loadingContact: false,
};

const getters = {
  dataContact: state => state.dataContact,
  loadingContact: state => state.loadingContact,
};

const actions = {
  async getDataContactRequest({ commit }) {
    commit("setLoadingContact", true);
    commit("getDataContactSuccess", await api.getDataContact())
    commit("setLoadingContact", false);
  },
};

const mutations = {
  getDataContactSuccess(state, data) {
    state.dataContact = data;
  },
  updateContact(state, data) {
    state.dataContact = { ...data }
  },
  setLoadingContact(state, status) {
    state.loadingContact = status
  },
  cleanUpPageData(state) {
    state.dataContact = {}
    state.loadingContact = false
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
