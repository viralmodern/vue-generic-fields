import api from "../../api/negligence.detail.damage";
const state = {
  damage: []
};
const getters = {
  damage: state => state.damage
};

const actions = {
  async getDataDamageNegligenceRequest({ commit }) {
    commit("getDataDamageNegligence", await api.getDataDamageNegligence());
  },
  async addDamageRequest({ commit }, data) {
    commit("addDamages", data, await api.addDamages(data));
  },
  async updateDamageRequest({ commit }, data) {
    commit("updateDamages", data, await api.updateDamages(data));
  },
  async removeDamageRequest({ commit }, data) {
    commit("removeDamages", data, await api.removeDamages(data));
  }
};

const mutations = {
  getDataDamageNegligence(state, data) {
    state.damage = data;
  },
  addDamage(state, data) {
    state.damage.push(data);
  },
  updateDamage(state, data) {
    var issue = state.damage.find(x => x.id === data.id);
    issue.name = data.labelName;
    issue.color = data.colorValue;
  },
  removeDamage(state, id) {
    state.damage = state.damage.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
