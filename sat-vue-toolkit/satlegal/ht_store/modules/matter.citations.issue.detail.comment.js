
const state = {
  dataComments: [],
};

const getters = {
  dataComments: state => state.dataComments,
};

const actions = {
  async getDataCommentMessagesRequest({ commit }) {
    commit("getDataCommentMessages", []);
  },
  async sendCommentRequest({ commit }, data) {
    commit("sendComment", data);
  },
};

const mutations = {
  getDataCommentMessages(state, data) {
    state.dataComments = data;
  },
  sendComment(state, data) {
    state.dataComments.push(data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
