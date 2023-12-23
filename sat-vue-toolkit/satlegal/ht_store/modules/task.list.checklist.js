import api from "../../api/task.list.checklist";

const state = {
  status: false,
  message: ""
};
const getters = {
  status: state => state.status,
  message: state => state.message
};

const actions = {
  async addGroupChecklistRequest({ commit }, data) {
    const result = await api.addGroupChecklist(data);
    commit("handleActionSuccess", result);
    return result;
  },
  async deleteGroupChecklistRequest({ commit }, data) {
    const result = await api.deleteGroupChecklist(data);
    commit("handleActionSuccess", result);
    return result;
  },
  async addItemInGroupChecklistRequest({ commit }, data) {
    const result = await api.addItemInGroupChecklist(data);
    commit("handleActionSuccess", result);
    return result;
  },
  async removeItemInGroupChecklistRequest({ commit }, data) {
    const result = await api.removeItemInGroupChecklist(data);
    commit("handleActionSuccess", result);
    return result;
  },
  async checkItemRequest({ commit }, data) {
    const result = await api.checkItem(data);
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
