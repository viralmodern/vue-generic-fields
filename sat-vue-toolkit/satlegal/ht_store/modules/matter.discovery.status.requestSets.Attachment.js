import api from "../../api/matter.discovery.status.requestSets.Attachment";

const state = {
  attachments: []
}

const getters = {
  attachments: state => state.attachments
}

const actions = {
  async getAttachmentsRequestSets({ commit }, params) {
    commit("getAttachmentsRequestSets", await api.getAttachmentsRequestSets(params));
  },
  async addAttachmentRequest({ commit }, params) {
    commit("addAttachmentRequest", await api.addAttachmentRequest(params));
  },
  async removeAttachmentRequest({ commit }, params) {
    commit("removeAttachmentRequest", params, await api.removeAttachmentRequest(params));
  }
}

const mutations = {
  getAttachmentsRequestSets(state, results) {
    state.attachments = results;
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
