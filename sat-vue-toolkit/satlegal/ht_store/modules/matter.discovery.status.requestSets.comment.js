import api from "../../api/matter.discovery.status.requestSets.comment";

const state = {
  comments: [],
  totalComment: 0
}

const getters = {
  comments: state => state.comments,
  totalComment: state => state.totalComment
}

const actions = {
  async getCommentRequestSets({ commit }, params) {
    commit("getCommentRequestSets", await api.getCommentRequestSets(params));
  },
  async sendComment({ commit }, bodyRequest) {
    commit("sendComment", await api.sendComment(bodyRequest));
  }
}

const mutations = {
  getCommentRequestSets(state, comment) {
    let moreComment = comment.results;
    state.comments = state.comments.concat(moreComment)
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
