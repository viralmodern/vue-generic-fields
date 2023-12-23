import api from "../../api/matter.digitalHoweyChecklist.task.note";

const state = {
  dataNotes: []
};
const getters = {
  dataNotes: state => state.dataNotes
};

const actions = {
  async getDataNotesRequest({ commit }) {
    const result = await api.getDataNotes();
    commit("getDataNotes", result);
    return result;
  },
  async addNotesRequest({ commit }, data) {
    const result = await api.addNotes(data);
    commit("addNotes", result);
    return result;
  },
  async updateNotesRequest({ commit }, data) {
    const result = await api.updateNotes(data);
    commit("updateNotes", result);
    return result;
  },
  async removeNotesRequest({ commit }, id) {
    const result = await api.removeNotes(id);
    commit("removeNotes", result);
    return result;
  }
};

const mutations = {
  getDataNotes(state, data) {
    state.dataNotes = data;
  },
  addNotes(state, data) {
    data.id = Math.random();
    state.dataNotes.unshift(data);
  },
  updateNotes(state, data) {
    state.dataNotes = state.dataNotes.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeNotes(state, id) {
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
