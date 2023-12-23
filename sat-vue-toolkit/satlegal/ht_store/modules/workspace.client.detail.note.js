import api from "../../api/client.detail.note";
const state = {
  notes: []
};
const getters = {
  notes: state => state.notes
};

const actions = {
  async getDataClientNoteRequest({ commit }) {
    commit("getDataClientNote", await api.getDataNote());
  },
  async updateClientNoteRequest({ commit }, data) {
    commit("updateClientNote", await api.updateDataNote(data));
  },
  async deleteClientNoteRequest({ commit }, id) {
    commit("deleteClientNote", await api.deleteDataNote(id));
  },
  async addClientNoteRequest({ commit }, data) {
    commit("addClientNote", await api.addDataNote(data));
  }
};

const mutations = {
  getDataClientNote(state, data) {
    state.notes = data;
  },
  updateClientNote(state, data) {
    state.notes = state.notes.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  deleteClientNote(state, id) {
    state.notes = state.notes.filter(x => x.id !== id);
  },
  addClientNote(state, data) {
    state.notes.unshift(data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
