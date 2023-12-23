import api from "../../api/negligence.damage";
import label from "./matter.partient.damage.label"
const state = {
  damages: []
};
const getters = {
  damages: state => state.damages
};

const actions = {
  async getDataDamageNegligenceRequest({ commit }) {
    commit("getDataDamageNegligence", await api.getDataDamageNegligence());
  },
  async addDamagesRequest({ commit }, data) {
    commit("addDamages", data, await api.addDamages(data));
  },
  async updateDamagesRequest({ commit }, data) {
    commit("updateDamages", data, await api.updateDamages(data));
  },
  async removeDamagesRequest({ commit }, data) {
    commit("removeDamages", data, await api.removeDamages(data));
  }
};

const mutations = {
  getDataDamageNegligence(state, data) {
    state.damages = data;
  },
  addDamages(state, data) {
    state.damages = [...state.damages, data];
  },
  updateDamages(state, data) {
    var issue = state.damages.find(x => x.id === data.id);
    issue.name = data.labelName;
    issue.color = data.colorValue;
  },
  removeDamages(state, id) {
    state.damages = state.damages.filter(x => x.id !== id);
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
