import api from "../../api/matter.partient.practice";
import detail from "./matter.partient.practice.detail"
const state = {
  practices: []
};
const getters = {
  practices: state => state.practices
};

const actions = {
  async getDataPracticeRequest({ commit }) {
    commit("getDataPractice", await api.getListPractice());
  },
  async createPracticeRequest({ commit }, data) {
    const result = await api.createPractice(data);
    commit("createPractice", data);
    return result;
  },
  async editPracticeRequest({ commit }, data) {
    const result = await api.editPractice(data);
    commit("editPractice", data);
    return result;
  },
  async removePracticeRequest({ commit }, data) {
    const result = await api.removePractice(data.id);
    commit("removePractice", data);
    return result;
  }
};

const mutations = {
  getDataPractice(state, data) {
    state.practices = data;
  },
  createPractice(state, data) {
    state.practices.unshift(data)
  },
  editPractice(state, data) {
    const item = state.practices.find(x => x.id === data.parentId)
    item[data.column] = data.value
  },
  removePractice(state, data) {
    state.practices = state.practices.filter(x => x.id !== data);
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
