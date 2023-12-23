import apiEvidences from "../../api/matter.discovery.evidences";
import apiHearsay from "../../api/matter.discovery.hearsay";
import apiTestimony from "../../api/matter.discovery.testimony";
import detail from "./matter.discovery.evidences.detail";

const state = {
  dataEvidences: [],
  dataHearsay: [],
  dataTestimony: []
}

const getters = {
  dataEvidences: state => state.dataEvidences,
  dataHearsay: state => state.dataHearsay,
  dataTestimony: state => state.dataTestimony

}

const actions = {
  async getDataDiscoveryEvidences({ commit }, matterId) {
    commit("getDataDiscoveryEvidences", await apiEvidences.getDataDiscoveryEvidences(matterId))
  },
  async updateTask({ commit }, data) {
    if (data.groupType === 'evidences-grid') {
      await apiEvidences.editDataDiscovery(data);
      commit("updateTaskEvidenceSuccess", data);
    } else if (data.groupType === 'hearsay-grid') {
      await apiHearsay.editDataDiscovery(data);
      commit("updateTaskHearsaySuccess", data);
    } else {
      await apiTestimony.editDataDiscovery(data);
      commit("updateTaskTestimonySuccess", data);
    }
  },
  async createItemEvidences({ commit }, data) {


    if (data.groupType === 'evidences-grid') {
      const results = await apiEvidences.createItemEvidences(data);
      commit("createItemEvidences", results);
    } else if (data.groupType === 'hearsay-grid') {
      const results = await apiHearsay.createItemEvidences(data);
      commit("createItemHearsay", results);
    } else {
      const results = await apiTestimony.createItemEvidences(data);
      commit("createItemTestimony", results);
    }
  },

  //hearsay
  async getDataDiscoveryHearsayRequest({ commit }, matterId) {
    commit("getDataDiscoveryHearsay", await apiHearsay.getDataDiscoveryHearsay(matterId))
  },

  //testimony
  async getDataDiscoveryTestimonyRequest({ commit }, matterId) {
    commit("getDataDiscoveryTestimony", await apiTestimony.getDataDiscoveryTestimony(matterId))
  },
}

const mutations = {
  //evidences
  createItemEvidences(state, data) {
    state.dataEvidences = [data, ...state.dataEvidences];
  },
  getDataDiscoveryEvidences(state, dataEvidences) {
    state.dataEvidences = dataEvidences
  },
  updateTaskEvidenceSuccess(state, data) {
    const item = state.dataEvidences.find(x => x.id === data.taskId);
    item[data.columnName] = data.newValue;
  },

  //hearsay
  getDataDiscoveryHearsay(state, dataHearsay) {
    state.dataHearsay = dataHearsay
  },
  updateTaskHearsaySuccess(state, data) {
    const item = state.dataHearsay.find(x => x.id === data.taskId);
    item[data.columnName] = data.newValue;
  },
  createItemHearsay(state, data) {
    state.dataHearsay = [data, ...state.dataHearsay];
  },


  //testimony
  getDataDiscoveryTestimony(state, dataTestimony) {
    state.dataTestimony = dataTestimony
  },
  updateTaskTestimonySuccess(state, data) {
    const item = state.dataTestimony.find(x => x.id === data.taskId);
    item[data.columnName] = data.newValue;
  },
  createItemTestimony(state, data) {
    state.dataTestimony = [data, ...state.dataTestimony];
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules: {
    detail
  }
}
