import api from "../../api/matter.hearing.checklist";

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
    if (result.status) {
      commit("matter/hearing/addGroupChecklist", data, { root: true });
    }
    return result;
  },
  async removeGroupChecklistRequest({ commit }, data) {
    const result = await api.deleteGroupChecklist(data);
    commit("handleActionSuccess", result);
    if (result.status) {
      commit("matter/hearing/removeGroupChecklist", data, { root: true });
    }
    return result;
  },
  async addItemInGroupChecklistRequest({ commit }, data) {
    const result = await api.addItemInGroupChecklist(data);
    commit("handleActionSuccess", result);
    if (result.status) {
      commit("matter/hearing/addItemInGroupChecklist", data, { root: true });
    }
    return result;
  },
  async removeItemInGroupChecklistRequest({ commit }, data) {
    const result = await api.removeItemInGroupChecklist(data);
    commit("handleActionSuccess", result);
    if (result.status) {
      commit("matter/hearing/removeItemInGroupChecklist", data, { root: true });
    }
    return result;
  },
  async updateItemInGroupChecklistRequest({ commit }, data) {
    const result = await api.removeItemInGroupChecklist(data);
    commit("handleActionSuccess", result);
    if (result.status) {
      commit("matter/hearing/updateItemInGroupChecklist", data, {
        root: true
      });
    }
    return result;
  },
  async checkItemRequest({ commit }, data) {
    const result = await api.checkItem(data);
    commit("handleActionSuccess", result);
    if (result.status) {
      commit("matter/hearing/checkItem", data, { root: true });
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
