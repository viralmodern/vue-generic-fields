import api from "../../api/negligence.detail.injury";
import label from "./matter.partient.negligence.detail.injury.label"
const state = {
  injurys: []
};
const getters = {
  injurys: state => state.injurys
};

const actions = {
  async getDataInjuryNegligenceRequest({ commit }) {
    commit("getDataInjuryNegligence", await api.getDataInjuryNegligence());
  },
  async addInjuryRequest({ commit }, data) {
    commit("addInjurys", data, await api.addInjurys(data));
  },
  async updateInjuryRequest({ commit }, data) {
    commit("updateInjurys", data, await api.updateInjurys(data));
  },
  async removeInjuryRequest({ commit }, data) {
    commit("removeInjurys", data, await api.removeInjurys(data));
  }
};

const mutations = {
  getDataInjuryNegligence(state, data) {
    state.injurys = data;
  },
  addInjurys(state, data) {
    state.injurys.push(data);
  },
  updateInjurys(state, data) {
    var issue = state.injurys.find(x => x.id === data.id);
    issue.name = data.labelName;
    issue.color = data.colorValue;
  },
  removeInjurys(state, id) {
    state.injurys = state.injurys.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    label
  }
};
