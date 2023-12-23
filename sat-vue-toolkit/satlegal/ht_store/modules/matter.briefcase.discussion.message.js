import api from "../../api/matter.briefcase.discussion.message";
const state = {
  messages: []
};
const getters = {
  messages: state => state.messages
};

const actions = {
  async getDataMessageClientRequest({ commit }) {
    commit("getDataMessageClient", await api.getMessageClient());
  },
  async updateClientMessageRequest({ commit }, data) {
    commit("updateClientMessage", await api.updateMessageClient(data));
  },
  async deleteClientMessageRequest({ commit }, id) {
    commit("deleteClientMessage", await api.deleteMessageClient(id));
  },
  async addMessageRequest({ commit }, data) {
    commit("addMessage", await api.addMessageClient(data));
  }
};

const mutations = {
  getDataMessageClient(state, data) {
    state.messages = data;
  },
  updateClientMessage(state, data) {
    const item = state.messages.find(x => x.id === data.parentId)
    item[data.column] = data.value
  },
  deleteClientMessage(state, id) {
    state.messages = state.messages.filter(x => x.id !== id)
  },
  addMessage(state, data) {
    state.messages.unshift(data)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
