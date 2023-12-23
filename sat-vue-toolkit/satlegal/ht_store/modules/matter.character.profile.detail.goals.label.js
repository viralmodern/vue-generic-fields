import api from "../../api/character.goal.label";

const state = {
  labels: []
};
const getters = {
  labels: state => state.labels
};

const actions = {
  async getDataGoalLabelRequest({ commit }) {
    commit("getDataGoalLabel", await api.listGoalLabel());
  }
};

const mutations = {
  getDataGoalLabel(state, data) {
    state.labels = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
