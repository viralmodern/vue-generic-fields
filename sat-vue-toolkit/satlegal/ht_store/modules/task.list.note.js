import api from "../../api/task.list.note";

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
    return result;
  },
  async removeNoteRequest({ commit }, data) {
    const result = await api.removeNote(data);
    commit("handleActionSuccess", result);
    return result;
  },
  async editNoteRequest({ commit }, data) {
    const result = await api.editNote(data);
    commit("handleActionSuccess", result);
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
