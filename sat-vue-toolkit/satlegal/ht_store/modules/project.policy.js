
import api from "../../api/project.policy";
import lifeCycle from "./project.policy.lifeCycle"

const state = {
  dataDetailList: []
};

const getters = {
  dataDetailList: state => state.dataDetailList
};

const actions = {
  async getDataDetailListRequest({ commit }) {
    commit("getDataDetailListSuccess", await api.getDataDetailList());
  }
};

const mutations = {
  getDataDetailListSuccess(state, data) {
    state.dataDetailList = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    lifeCycle
  }
};
