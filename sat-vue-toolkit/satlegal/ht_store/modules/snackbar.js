const state = {
  messages: []
};

const getters = {
  messages: state => state.messages
};

const mutations = {
  setMessages(state, messages) {
    state.messages = messages;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
