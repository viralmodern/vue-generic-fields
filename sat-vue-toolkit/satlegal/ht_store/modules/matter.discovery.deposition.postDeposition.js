import api from "../../api/matter.discovery.deposition.postDeposition";

const state = {
  dataStatistics: []
}

const getters = {
  dataStatistics: state => state.dataStatistics
}

const actions = {
  async getDataStatistics({ commit }, req) {
    commit("getDataStatistics", await api.getDataStatistics(req))
  }
}

const mutations = {
  getDataStatistics(state, resp) {
    state.dataStatistics = resp;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
