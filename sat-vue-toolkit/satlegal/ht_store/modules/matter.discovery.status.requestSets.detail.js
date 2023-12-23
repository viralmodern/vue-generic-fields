import api from "../../api/matter.discovery.status.requestSets.detail";
import Api from "../../api/matter.discovery.status.requestSets";

const state = {
  dataRequestDetail: {}
}

const getters = {
  dataRequestDetail: state => state.dataRequestDetail
}

const actions = {
  async getRequestSetDetail({ commit }, params) {
    commit("getRequestSetDetail", await api.getRequestSetDetail(params));
  },
  async updateRequest({ commit }, params) {
    commit("updateRequest", params, await Api.updateRequest(params))
  }
}

const mutations = {
  getRequestSetDetail(state, results) {
    state.dataRequestDetail = results;
  },
  updateRequest(state, data) {
    const task = state.dataRequestDetail;
    switch (data.columnName) {
      case "name":
        task.name = data.newValue;
        break;
      case "members":
        task.members = data.newValue;
        break;
      case "priority":
        task.priority = data.newValue;
        break;
    }
    return task;
  },
  cleanUpPageData(state) {
    state.dataRequestDetail = {};
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
