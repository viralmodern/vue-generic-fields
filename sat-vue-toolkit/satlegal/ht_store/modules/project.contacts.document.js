import api from "../../api/project.contacts.detail";

const state = {
  listDocuments: [],
  loading: false
};

const getters = {
  listDocuments: state => state.listDocuments,
  loading: state => state.loading
};

const actions = {
  async getDataListdocumentsRequest({ commit }) {
    commit("loadingSuccess", true);
    commit("getDataListdocuments", await api.getDataListDocument());
    commit("loadingSuccess", false);
  }
};

const mutations = {
  loadingSuccess(state, loading) {
    state.loading = loading;
  },
  getDataListdocuments(state, listDocuments) {
    state.listDocuments = listDocuments;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
