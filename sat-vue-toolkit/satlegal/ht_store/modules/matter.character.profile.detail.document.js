import api from "../../api/matter.character.detail.document";

const state = {
  documents: []
};
const getters = {
  documents: state => state.documents
};

const actions = {
  async getDataDocumentRequest({ commit }) {
    commit("getDataDocument", await api.getDataDocument());
  }
};

const mutations = {
  getDataDocument(state, data) {
    state.documents = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
