import api from "../../api/matter.discovery.status.requestTask.attachment";

const state = {
  attachments: []
}

const getters = {
  attachments: state => state.attachments
}

const actions = {
  async getAttachmentsRequestTask({ commit }, params) {
    commit("getAttachmentsRequestTask", await api.getAttachmentsRequestTask(params));
  },
  async addAttachmentRequest({ commit }, params) {
    const dataApi = await api.addAttachmentRequest(params);
    commit("addAttachmentRequest", dataApi);
    return dataApi;
  },
  async removeAttachmentRequest({ commit }, params) {
    commit("removeAttachmentRequest", params, await api.removeAttachmentRequest(params));
  }
}

const mutations = {
  getAttachmentsRequestTask(state, results) {
    state.attachments = results.results;
  },
  addAttachmentRequest(state, results) {
    state.attachments = state.attachments.concat(results.attachments);
  },
  removeAttachmentRequest(state, params) {
    state.attachments = state.attachments.filter(x => x.pk !== params.id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
