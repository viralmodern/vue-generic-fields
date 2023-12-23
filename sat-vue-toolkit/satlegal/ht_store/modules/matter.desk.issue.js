import api from "../../api/matter.desk.issue";

const state = {
  dataDeskIssue: []
};

const getters = {
  dataDeskIssue: state => state.dataDeskIssue
};

const actions = {
  async getDataDeskIssueRequest({ commit }) {
    commit("getDataDeskIssue", await api.getDataDeskIssue());
  },
  async addDeskIssueRequest({ commit }, data) {
    commit("addDeskIssue", data, await api.addDeskIssue(data));
  },
  async updateDeskIssueRequest({ commit }, data) {
    commit("updateDeskIssue", data, await api.updateDeskIssue(data));
  },
  async removeDeskIssueRequest({ commit }, data) {
    commit("removeDeskIssue", data, await api.removeDeskIssue(data));
  }
};

const mutations = {
  getDataDeskIssue(state, data) {
    state.dataDeskIssue = data;
  },
  addDeskIssue(state, data) {
    state.dataDeskIssue = [...state.dataDeskIssue, data];
  },
  updateDeskIssue(state, data) {
    var issue = state.dataDeskIssue.find(x => x.id === data.id);
    issue.name = data.labelName;
    issue.color = data.colorValue;
  },
  removeDeskIssue(state, id) {
    state.dataDeskIssue = state.dataDeskIssue.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
