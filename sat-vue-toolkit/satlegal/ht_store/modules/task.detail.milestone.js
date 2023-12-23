import api from "../../api/task.detail";

const state = {
  isSave: false
};

const getters = {
  isSave: state => state.isSave
};

const actions = {
  async postSaveStartDate({ commit }, startDate) {
    commit("postSaveSuccess", await api.saveStartDate(startDate));
  },
  async postSaveEndDate({ commit }, endDate) {
    commit("postSaveSuccess", await api.saveEndDate(endDate));
  }
};

const mutations = {
  postSaveSuccess(state, isSave) {
    state.isSave = isSave;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
