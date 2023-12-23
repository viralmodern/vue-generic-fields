import api from "../../api/matter.partient.negligence";
import detail from "./matter.partient.negligence.detail"
const state = {
  negligences: []
};
const getters = {
  negligences: state => state.negligences
};

const actions = {
  async getDataNegligenceRequest({ commit }) {
    commit("getDataNegligence", await api.getListNegligence());
  },
  async createNegligenceRequest({ commit }, data) {
    const result = await api.createNegligence(data);
    commit("createNeligence", data);
    return result;
  },
  async editNegligenceRequest({ commit }, data) {
    const result = await api.editNegligence(data);
    commit("editNegligence", data);
    return result;
  },
  async removeNegligenceRequest({ commit }, data) {
    const result = await api.removeNegligence(data.id);
    commit("removeNegligence", data);
    return result;
  }
};

const mutations = {
  getDataNegligence(state, data) {
    state.negligences = data;
  },
  createNeligence(state, data) {
    state.negligences.unshift(data)
  },
  editNegligence(state, data) {
    const item = state.negligences.find(x => x.id === data.parentId)
    item[data.column] = data.value
  },
  removeNegligence(state, data) {
    state.negligences = state.negligences.filter(x => x.id !== data);
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
