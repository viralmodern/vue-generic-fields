import api from "../../api/matter.hearing.attachment";

const state = {
  status: false,
  message: ""
};
const getters = {
  status: state => state.status,
  message: state => state.message
};

const actions = {
  async uploadAttachmentRequest({ commit }, data) {
    const result = await api.uploadAttachment(data);
    commit("handleActionSuccess", result);
    if (result.status) {
      commit("matter/hearing/uploadFile", data, { root: true });
    }
    return result;
  },
  async removeAttachmentRequest({ commit }, data) {
    const result = await api.removeAttachment(data);
    commit("handleActionSuccess", result);
    if (result.status) {
      commit("matter/hearing/deleteFile", data, { root: true });
    }
    return result;
  },
  async updateRateAttachmentRequest({ commit }, data) {
    const result = await api.updateRateAttach(data);
    commit("handleActionSuccess", result);
    if (result.status) {
      commit("matter/hearing/updateRateFile", data, { root: true });
    }
    return result;
  }
};

const mutations = {
  handleActionSuccess(state, data) {
    state.status = data.status;
    state.message = data.message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
