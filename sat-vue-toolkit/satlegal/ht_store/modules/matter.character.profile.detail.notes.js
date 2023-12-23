import api from "../../api/matter.character.detail.notes";

const state = {
  notes: [],
  totals: 0
};
const getters = {
  notes: state => {
    return state.notes.map(x => ({
      ...x,
      title: x.name
    }))
  },
  totals: state => state.totals
};

const actions = {
  async getDataNotesRequest({ commit }, request) {
    commit("getDataNotes", await api.getDataNotes(request));
  },
  async postNotes({ commit }, request) {
    commit("postNotes", await api.postNotes(request));
  },
  async updateNotes({ commit }, request) {
    commit("updateNotes", await api.updateNotes(request));
  },
  async removeNotes({ commit }, request) {
    commit("removeNotes", request.noteId, await api.removeNotes(request));
  }
};

const mutations = {
  getDataNotes(state, data) {
    state.notes = data.results;
    state.totals = data.count;
  },
  postNotes(state, response) {
    state.notes = [response, ...state.notes];
  },
  updateNotes(state, response) {
    let item = state.notes.find(x => x.pk === response.pk);
    item.name = response.name;
    item.content = response.content;
  },
  removeNotes(state, noteId) {
    state.notes = state.notes.filter(e => e.pk !== noteId);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
