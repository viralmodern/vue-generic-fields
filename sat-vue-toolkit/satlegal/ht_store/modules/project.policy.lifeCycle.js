
import api from "../../api/project.policy.lifeCycle";

const state = {
  dataPolicyLifecycle: [],
  loadingPolicyLifecycle: false
};

const getters = {
  dataPolicyLifecycle: state => state.dataPolicyLifecycle,
  loadingPolicyLifecycle: state => state.loadingPolicyLifecycle,
};

const actions = {
  async getDataPolicyLifecycleRequest({ commit }) {
    commit("setLoadingPolicyLifecycle", true)
    commit("getDataPolicyLifecycleSuccess", await api.getDataPolicyLifecycle());
    commit("setLoadingPolicyLifecycle", false)
  }
};

const mutations = {
  getDataPolicyLifecycleSuccess(state, data) {
    state.dataPolicyLifecycle = data;
  },
  setLoadingPolicyLifecycle(state, status) {
    state.loadingPolicyLifecycle = status
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
