import api from "../../api/matter.discovery.status.requestTask.comment";

const state = {
  comments: [],
  totalComment: 0
}

const getters = {
  comments: state => state.comments,
  totalComment: state => state.totalComment
}

const actions = {
  async getCommentRequestTask({ commit }, params) {
    commit("getCommentRequestTask", await api.getCommentRequestTask(params));
  },
  async sendComment({ commit }, bodyRequest) {
    const dataApi = await api.sendComment(bodyRequest);
    commit("sendComment", dataApi);
    return dataApi;
  }
}

const mutations = {
  getCommentRequestTask(state, comment) {
    state.comments = comment.results
    state.totalComment = comment.count;
  },
  sendComment(state, results) {
    state.comments = [results, ...state.comments]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
