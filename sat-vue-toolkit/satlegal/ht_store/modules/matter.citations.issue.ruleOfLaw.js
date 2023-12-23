import api from "../../api/matter.citations.issue.ruleOfLaw";

const state = {
  dataRuleOfLaw: []
};

const getters = {
  dataRuleOfLaw: state => state.dataRuleOfLaw
};

const actions = {
  async getDataRuleOfLawRequest({ commit }) {
    commit("getDataRuleOfLaw", await api.getDataRuleOfLaw());
  },
  async addRuleOfLawRequest({ commit }, data) {
    commit("addRuleOfLaw", data, await api.addRuleOfLaw(data));
  },
  async updateRuleOfLawRequest({ commit }, data) {
    commit("updateRuleOfLaw", data, await api.updateRuleOfLaw(data));
  },
  async removeRuleOfLawRequest({ commit }, data) {
    commit("removeRuleOfLaw", data, await api.removeRuleOfLaw(data));
  }
};

const mutations = {
  getDataRuleOfLaw(state, data) {
    state.dataRuleOfLaw = data;
  },
  addRuleOfLaw(state, data) {
    state.dataRuleOfLaw = [...state.dataRuleOfLaw, data];
  },
  updateRuleOfLaw(state, data) {
    var issue = state.dataRuleOfLaw.find(x => x.id === data.id);
    issue.name = data.labelName;
    issue.color = data.colorValue;
  },
  removeRuleOfLaw(state, id) {
    state.dataRuleOfLaw = state.dataRuleOfLaw.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
