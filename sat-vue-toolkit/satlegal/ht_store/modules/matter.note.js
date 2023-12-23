import api from "../../api/matter.note";

const state = {
  notes: []
};
const getters = {
  notes: state => state.notes
};

const actions = {
  async getDataMatterNoteRequest({ commit }) {
    commit("getDataMatterNote", await api.getListNote());
  },
  async createNoteRequest({ commit }, data) {
    const result = await api.createNote(data);
    commit("createNote", data);
    return result;
  },
  async editNoteRequest({ commit }, data) {
    const result = await api.editNote(data);
    commit("editNote", data);
    return result;
  },
  async removeNoteRequest({ commit }, data) {
    const result = await api.removeNote(data.id);
    commit("deleteNote", data);
    return result;
  }
};

const mutations = {
  getDataMatterNote(state, data) {
    state.notes = data;
  },
  createNote(state, data) {
    state.notes = [...state.notes, data.newValue];
  },
  editNote(state, data) {
    let item = state.notes.find(x => x.id === data.newValue.id);
    item.content = data.newValue.content;
    item.title = data.newValue.title;
  },
  deleteNote(state, data) {
    state.notes = state.notes.filter(x => x.id !== data.id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
