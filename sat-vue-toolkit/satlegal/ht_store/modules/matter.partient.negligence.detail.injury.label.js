import api from "../../api/negligence.detail.injury.label";
const state = {
  label: []
};
const getters = {
  label: state => state.label
};

const actions = {
  async getDataInjuryNegligenceLabelRequest({ commit }) {
    commit("getDataInjuryLabelNegligence", await api.getDataInjuryLabelNegligence());
  },
  async addInjuryLabelRequest({ commit }, data) {
    commit("addLabelInjurys", data, await api.addLabelInjurys(data));
  },
  async updateInjuryLabelRequest({ commit }, data) {
    commit("updateLabelInjurys", data, await api.updateLabelInjurys(data));
  },
  async removeLabelInjurysRequest({ commit }, data) {
    commit("removeLabelInjurys", data, await api.removeLabelInjurys(data));
  }
};

const mutations = {
  getDataInjuryLabelNegligence(state, data) {
    state.label = data;
  },
  addLabelInjurys(state, data) {
    state.label = [...state.label, data];
  },
  updateLabelInjurys(state, data) {
    var issue = state.label.find(x => x.id === data.id);
    issue.name = data.labelName;
    issue.color = data.colorValue;
  },
  removeLabelInjurys(state, id) {
    state.label = state.label.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
