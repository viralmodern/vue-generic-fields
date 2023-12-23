import api from "../../api/client.detail.document";
const state = {
  document: {}
};
const getters = {
  document: state => state.document
};

const actions = {
  async getDataDocumentClientRequest({ commit }) {
    commit("getDataDocumentClient", await api.getDataDocumentClientDetail());
  },
  async updateDocumentRequest({ commit }, data) {
    commit("updateDocument", await api.updateDocument(data));
  },
  async deleteDocumentRequest({ commit }, id) {
    commit("deleteDocument", await api.deleteDocument(id));
  },
  async addDocumentRequest({ commit }, data) {
    commit("addDocument", await api.addDocument(data));
  }
};

const mutations = {
  getDataDocumentClient(state, data) {
    state.document = data;
  },
  updateDocument(state, data) {
    let item = state.document.items.find(x => x.id === data.parentId);
    item[data.column] = data.value
  },
  deleteDocument(state, id) {
    state.document.items = state.document.items.filter(x => x.id !== id)
  },
  addDocument(state, data) {
    state.document.items.unshift(data)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};