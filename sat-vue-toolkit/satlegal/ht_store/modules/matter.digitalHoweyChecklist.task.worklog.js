import api from "../../api/task.detail";

const state = {
  dataWorkLog: [],
};

const getters = {
  dataWorkLog: state => state.dataWorkLog
};

const actions = {
  async getDataWorkLogRequest({ commit }) {
    commit("getDataWorkLog", await api.getWorklog());
  }
};

const mutations = {
  getDataWorkLog(state, dataWorkLog) {
    state.dataWorkLog = dataWorkLog;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
