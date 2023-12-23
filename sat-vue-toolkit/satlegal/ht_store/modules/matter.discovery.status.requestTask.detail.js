import api from "../../api/matter.discovery.status.requestTask.detail";
import Api from "../../api/matter.discovery.status.requestTask";
import comments from "./matter.discovery.status.requestTask.detail.comment";
import notes from "./matter.discovery.status.requestTask.detail.notes";
import attachment from "./matter.discovery.status.requestTask.detail.attachment";

const state = {
  dataRequestDetail: {}
}

const getters = {
  dataRequestDetail: state => state.dataRequestDetail
}

const actions = {
  async getRequestTaskDetailRequest({ commit }, params) {
    commit("getRequestTaskDetail", await api.getRequestTaskDetail(params));
  },
  async updateRequest({ commit }, params) {
    commit("updateRequest", params, await Api.updateRequestTask(params))
  }
}

const mutations = {
  getRequestTaskDetail(state, results) {
    state.dataRequestDetail = results;
  },
  updateRequest(state, data) {
    const task = state.dataRequestDetail;
    task[data.columnName]  = data.newValue;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    comments,
    notes,
    attachment
  }
}
