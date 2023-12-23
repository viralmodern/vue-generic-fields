import api from '../../api/project.contacts.detail'

const state = {
  dataWork: {},
  loadingWork: false
};

const getters = {
  dataWork: state => state.dataWork,
  loadingWork: state => state.loadingWork,
};

const actions = {
  async getDataWorkRequest({ commit }) {
    commit("setLoadingWork", true);
    commit("getDataWorkSuccess", await api.getDataWork())
    commit("setLoadingWork", false);
  }
};

const mutations = {
  getDataWorkSuccess(state, data) {
    state.dataWork = data;
  },
  updateWork(state, data) {
    state.dataWork = { ...data }
  },
  setLoadingWork(state, status) {
    state.loadingWork = status
  },
  cleanUpPageData(state) {
    state.dataWork = {}
    state.loadingWork = false
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
