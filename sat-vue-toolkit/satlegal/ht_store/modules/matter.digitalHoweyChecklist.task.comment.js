import api from "../../api/matter.digitalHoweyChecklist.task.comment";

const state = {
  dataComment: []
};
const getters = {
  dataComment: state => state.dataComment
};

const actions = {
  async getDataCommentRequest({ commit }) {
    const result = await api.getDataComment();
    commit("getDataComment", result);
    return result;
  },
  async addCommentRequest({ commit }, data) {
    const result = await api.addComment(data);
    commit("addComment", result);
    return result;
  }
};

const mutations = {
  getDataComment(state, data) {
    state.dataComment = data;
  },
  addComment(state, data) {
    state.dataComment.unshift(data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
