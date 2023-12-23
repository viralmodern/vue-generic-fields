import api from "../../api/billing.invoice.detail.note";
const state = {
  dataNotes: []
};
const getters = {
  dataNotes: state => state.dataNotes
};

const actions = {
  async getDataInvoiceNoteRequest({ commit }) {
    commit("getDataInvoiceNote", await api.getListNotes());
  },
  async addNoteRequest({ commit }, data) {
    const result = await api.addNote(data);
    commit("createNote", result);
    return result;
  },
  async removeNoteRequest({ commit }, data) {
    const result = await api.removeNote(data);
    commit("removeNote", result);
    return result;
  },
  async editNoteRequest({ commit }, data) {
    const result = await api.editNote(data);
    commit("editNote", result);
    return result;
  }
};

const mutations = {
  getDataInvoiceNote(state, data) {
    state.dataNotes = data;
  },
  createNote(state, data) {
    state.dataNotes.unshift(data);
  },
  editNote(state, data) {
    let note = state.dataNotes.find(x => x.id === data.id);
    note.title = data.title;
    note.content = data.content;
  },
  removeNote(state, id) {
    state.dataNotes = state.dataNotes.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
