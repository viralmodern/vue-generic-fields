import api from "../../api/project.research.facts.detail.checklist";

const state = {};
const getters = {};

const actions = {
  async addGroupChecklistRequest({ commit }, data) {
    const result = await api.addGroupChecklist(data);
    commit("project/research/facts/detail/addGroupChecklist", data, { root: true });
    return result;
  },
  async removeGroupChecklistRequest({ commit }, data) {
    const result = await api.deleteGroupChecklist(data);
    commit("project/research/facts/detail/removeGroupChecklist", data, { root: true });
    return result;
  },
  async addItemInGroupChecklistRequest({ commit }, data) {
    const result = await api.addItemInGroupChecklist(data);
    commit("project/research/facts/detail/addItemInGroupChecklist", data, { root: true });
    return result;
  },
  async removeItemInGroupChecklistRequest({ commit }, data) {
    const result = await api.removeItemInGroupChecklist(data);
    commit("project/research/facts/detail/removeItemInGroupChecklist", data, { root: true });
    return result;
  },
  async updateItemInGroupChecklistRequest({ commit }, data) {
    const result = await api.updateItemInGroupChecklist(data);
    commit("project/research/facts/detail/updateItemInGroupChecklist", data, {
      root: true
    });
    return result;
  },
  async checkItemRequest({ commit }, data) {
    const result = await api.checkItem(data);
    commit("project/research/facts/detail/checkItem", data, { root: true });
    return result;
  }
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
