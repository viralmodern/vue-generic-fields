import api from "../../api/matter.citations.issue.detail.questionToAnswer";

const state = {
  dataQuestionToAnswer: []
};
const getters = {
  dataQuestionToAnswer: state => state.dataQuestionToAnswer
};

const actions = {
  async getDataQuestionToAnswerRequest({ commit }) {
    const result = await api.getDataQuestionToAnswer();
    commit("getDataQuestionToAnswer", result);
    return result;
  },
  async addQuestionToAnswerRequest({ commit }, data) {
    const result = await api.addQuestionToAnswer(data);
    result.id = Math.random();
    result.characters = [];
    commit("addQuestionToAnswer", result);
    return result;
  },
  async updateQuestionToAnswerRequest({ commit }, data) {
    const result = await api.updateQuestionToAnswer(data);
    commit("updateQuestionToAnswer", result);
    return result;
  },
  async removeQuestionToAnswerRequest({ commit }, data) {
    const result = await api.removeQuestionToAnswer(data);
    commit("removeQuestionToAnswer", result);
    return result;
  }
};

const mutations = {
  getDataQuestionToAnswer(state, data) {
    state.dataQuestionToAnswer = data;
  },
  addQuestionToAnswer(state, data) {
    state.dataQuestionToAnswer.unshift(data);
  },
  updateQuestionToAnswer(state, data) {
    state.dataQuestionToAnswer = state.dataQuestionToAnswer.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeQuestionToAnswer(state, id) {
    state.dataQuestionToAnswer = state.dataQuestionToAnswer.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
