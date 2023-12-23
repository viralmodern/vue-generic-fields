import api from "../../api/project.contacts.detail";

const state = {
  listNotes: [],
  loading: false
};

const getters = {
  listNotes: state => state.listNotes,
  loading: state => state.loading
};

const actions = {
  async getDataListNotesRequest({ commit }) {
    commit("loadingSuccess", true);
    commit("getDataListNotesSuccess", await api.getDataListNotes());
    commit("loadingSuccess", false);
  },
  async addNoteRequest({ commit }, itemNote) {
    commit("addNoteSuccess", await api.addNote(itemNote));
  },
  async removeNoteRequest({ commit }, idNote) {
    commit("removeNoteSuccess", await api.removeItemNote(idNote));
  }
};

const mutations = {
  loadingSuccess(state, loading) {
    state.loading = loading;
  },
  getDataListNotesSuccess(state, listNotes) {
    state.listNotes = listNotes;
  },
  addNoteSuccess(state, itemNote) {
    state.listNotes = [itemNote, ...state.listNotes];
  },
  removeNoteSuccess(state, idNote) {
    state.listNotes = state.listNotes.filter(e => e.id !== idNote);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
