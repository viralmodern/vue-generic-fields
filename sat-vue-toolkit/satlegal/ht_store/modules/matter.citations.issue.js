import api from "../../api/matter.citations.issue";
import detail from "./matter.citations.issue.detail";

const state = {
  dataLabelIssue: []
};

const getters = {
  dataLabelIssue: state => state.dataLabelIssue
};

const actions = {
  async getDataLabelIssue({ commit }) {
    commit("getDataLabelIssue", await api.getDataLabelIssue());
  },
  async addLabelsIssue({ commit }, data) {
    commit("addLabelsIssue", data, await api.addLabelsIssue(data));
  },
  async updateLabelsIssue({ commit }, data) {
    commit("updateLabelsIssue", data, await api.updateLabelsIssue(data));
  },
  async removeLabelsIssue({ commit }, data) {
    commit("removeLabelsIssue", data, await api.removeLabelsIssue(data));
  }
};

const mutations = {
  getDataLabelIssue(state, dataLabelIssue) {
    state.dataLabelIssue = dataLabelIssue;
  },
  addLabelsIssue(state, data) {
    state.dataLabelIssue = [...state.dataLabelIssue, data];
  },
  updateLabelsIssue(state, data) {
    var issue = state.dataLabelIssue.find(x => x.id === data.id);
    issue.text = data.labelName;
    issue.color = data.colorValue;
  },
  removeLabelsIssue(state, id) {
    state.dataLabelIssue = state.dataLabelIssue.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    detail
  }
};
