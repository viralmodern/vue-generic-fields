import api from "../../api/matter.discovery.log.attachment";
const state = {
  attachments: []
};
const getters = {
  attachments: state => state.attachments
};

const actions = {
  async getDataAttachmentRequest({ commit }) {
    commit("getDataAttachment", await api.getDataAttachment());
  },
  async uploadAttachmentRequest({ commit }, data) {
    commit("uploadFile", data);
  },
  async removeAttachmentRequest({ commit }, data) {
    const result = await api.removeAttachment(data);
    commit("deleteFile", result);
    return result;
  },
  async updateRateAttachmentRequest({ commit }, data) {
    const result = await api.updateRateAttachment(data);
    commit("updateRateFile", result);
  }
};

const mutations = {
  getDataAttachment(state, data) {
    state.attachments = data;
  },
  uploadFile(state, data) {
    state.attachments = [...state.attachments, ...data];
  },
  deleteFile(state, idAttachment) {
    state.attachments = state.attachments.filter(
      x => x.id !== idAttachment
    );
  },
  updateRateFile(state, idAttachment) {
    state.attachments = state.attachments.map(x => {
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
