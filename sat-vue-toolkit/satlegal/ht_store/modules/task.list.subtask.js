import api from "../../api/task.list.subtask";

const state = {
  status: false,
  message: ""
};
const getters = {
  status: state => state.status,
  message: state => state.message
};

const actions = {
  async addSubTaskRequest({ commit }, data) {
    const result = await api.addSubTask(data);
    commit("handleActionSuccess", result);
    return result;
  },
  async removeSubTaskRequest({ commit }, data) {
    const result = await api.removeSubTask(data);
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
