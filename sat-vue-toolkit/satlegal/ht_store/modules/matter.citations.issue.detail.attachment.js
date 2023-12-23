import api from "../../api/matter.citations.issue.detail.attachment";

const state = {
  dataAttachment: []
};
const getters = {
  dataAttachment: state => state.dataAttachment
};

const actions = {
  async getDataAttachmentRequest({ commit }, data) {
    const result = await api.getDataAttachment(data);
    commit("getDataAttachment", result);
    return result;
  },
  async uploadAttachmentRequest({ commit }, data) {
    const result = await api.uploadAttachment(data)
    commit("uploadFile", result);
    return result;
  },
  async removeAttachmentRequest({ commit }, data) {
    const result = await api.removeAttachment(data);
    commit("deleteFile", result);
    return result;
  },
  async updateRateAttachmentRequest({ commit }, data) {
    const result = await api.updateRateAttachment(data);
    commit("updateRateFile", result);
    return result;
  }
};

const mutations = {
  getDataAttachment(state, data) {
    state.dataAttachment = data;
  },
  uploadFile(state, { files }) {
    state.dataAttachment = [...state.dataAttachment, ...files];
  },
  deleteFile(state, idAttachment) {
    state.dataAttachment = state.dataAttachment.filter(
      x => x.id !== idAttachment
    );
  },
  updateRateFile(state, idAttachment) {
    state.dataAttachment = state.dataAttachment.map(x => {
      if (x.id === idAttachment) {
        return { ...x, rate: !x.rate };
      } else return x;
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
