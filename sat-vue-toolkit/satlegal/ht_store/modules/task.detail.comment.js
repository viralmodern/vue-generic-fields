
import api from "../../api/task.detail";

const state = {
  dataTicketMessages: [],
  dataAvailableMentions: [],
};

const getters = {
  dataTicketMessages: state => state.dataTicketMessages,
  dataAvailableMentions: state => state.dataAvailableMentions,
};

const actions = {
  async getDataTicketMessagesRequest({ commit }) {
    commit("getDataTicketMessages", await api.getTicketMessages());
  },
  async getDataAvailableMentionsRequest({ commit }) {
    commit("getDataAvailableMentions", await api.getAvailableMentions());
  },
};

const mutations = {
  getDataTicketMessages(state, dataTicketMessages) {
    state.dataTicketMessages = dataTicketMessages;
  },
  getDataAvailableMentions(state, dataAvailableMentions) {
    state.dataAvailableMentions = dataAvailableMentions;
  },
  sendComment(state, data) {
    state.dataTicketMessages = [data, ...state.dataTicketMessages];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
