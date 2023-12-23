import api from "../../api/matter.hearing.note";

const state = {
  status: false,
  message: ""
};
const getters = {
  status: state => state.status,
  message: state => state.message
};

const actions = {
  async addNoteRequest({ commit }, data) {
    const result = await api.addNote(data);
    commit("handleActionSuccess", result);
    if (result.status) {
      commit("matter/hearing/createNote", data, { root: true });
    }
    return result;
  },
  async removeNoteRequest({ commit }, data) {
    const result = await api.removeNote(data);
    commit("handleActionSuccess", result);
    if (result.status) {
      commit("matter/hearing/removeNote", data, { root: true });
    }
    return result;
  },
  async editNoteRequest({ commit }, data) {
    const result = await api.editNote(data);
    commit("handleActionSuccess", result);
    if (result.status) {
      commit("matter/hearing/editNote", data, { root: true });
    }
    return result;
  }
};

const mutations = {
  handleActionSuccess(state, data) {
    state.status = data.status;
    state.message = data.message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
