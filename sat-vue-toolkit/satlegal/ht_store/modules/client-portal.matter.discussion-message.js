import api from "../../api/client-portal.matter.discussion-message";
const state = {
  messages: []
};
const getters = {
  messages: state => state.messages
};

const actions = {
  async getDataPortalMessageRequest({ commit }) {
    commit("getDataPortalMessage", await api.getPortalMessage());
  },
  async updatePortalMessageRequest({ commit }, data) {
    commit("updatePortalMessage", await api.updatePortalMessage(data));
  },
  async deletePortalMessageRequest({ commit }, id) {
    commit("deletePortalMessage", await api.deletePortalMessage(id));
  },
  async addMessageRequest({ commit }, data) {
    commit("addMessage", await api.addPortalMessage(data));
  }
};

const mutations = {
  getDataPortalMessage(state, data) {
    state.messages = data;
  },
  updatePortalMessage(state, data) {
    const item = state.messages.find(x => x.id === data.parentId);
    item[data.column] = data.value;
  },
  deletePortalMessage(state, id) {
    state.messages = state.messages.filter(x => x.id !== id);
  },
  addMessage(state, data) {
    state.messages.unshift(data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
