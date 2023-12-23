import api from "../../api/matter.digitalHoweyChecklist.labels";

const state = {
  dataLabels: []
};

const getters = {
  dataLabels: state => state.dataLabels
};

const actions = {
  async getDataLabelsRequest({ commit }) {
    commit("getDataLabels", await api.getDataLabels());
  },
  async addLabelsRequest({ commit }, data) {
    commit("addLabels", data, await api.addLabels(data));
  },
  async updateLabelsRequest({ commit }, data) {
    commit("updateLabels", data, await api.updateLabels(data));
  },
  async removeLabelsRequest({ commit }, data) {
    commit("removeLabels", data, await api.removeLabels(data));
  }
};

const mutations = {
  getDataLabels(state, data) {
    state.dataLabels = data;
  },
  addLabels(state, data) {
    data.text = data.name;
    state.dataLabels = [...state.dataLabels, data];
  },
  updateLabels(state, data) {
    var issue = state.dataLabels.find(x => x.id === data.id);
    issue.text = data.labelName;
    issue.color = data.colorValue;
  },
  removeLabels(state, id) {
    state.dataLabels = state.dataLabels.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
