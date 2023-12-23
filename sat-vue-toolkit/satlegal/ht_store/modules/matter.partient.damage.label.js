import api from "../../api/negligence.damage.label";
const state = {
  labels: []
};
const getters = {
  labels: state => state.labels
};

const actions = {
  async getDataDamageNegligenceLabelRequest({ commit }) {
    commit("getDataDamageLabelNegligence", await api.getDataDamageLabelNegligence());
  },
  async addDamageLabelRequest({ commit }, data) {
    commit("addLabelDamages", data, await api.addLabelDamages(data));
  },
  async updateDamageLabelRequest({ commit }, data) {
    commit("updateLabelDamages", data, await api.updateLabelDamages(data));
  },
  async removeLabelDamagesRequest({ commit }, data) {
    commit("removeLabelDamages", data, await api.removeLabelDamages(data));
  }
};

const mutations = {
  getDataDamageLabelNegligence(state, data) {
    state.labels = data;
  },
  addLabelDamages(state, data) {
    state.labels = [...state.label, data];
  },
  updateLabelDamages(state, data) {
    var issue = state.labels.find(x => x.id === data.id);
    issue.name = data.labelName;
    issue.color = data.colorValue;
  },
  removeLabelDamages(state, id) {
    state.labels = state.labels.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
