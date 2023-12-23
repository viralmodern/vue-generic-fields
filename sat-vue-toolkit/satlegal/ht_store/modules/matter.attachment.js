import api from "../../api/matter.attachment";

const state = {
  attachments: []
};
const getters = {
  attachments: state => state.attachments
};

const actions = {
  async getDataAttachmentRequest({ commit }) {
    commit("getDataAttachment", await api.getListAttachment());
  },
  async createAttachmentRequest({ commit }, data) {
    const result = await api.createAttachment(data);
    commit("createAttachment", data);
    return result;
  },
  async deleteAttachmentRequest({ commit }, data) {
    const result = await api.deleteAttachment(data);
    commit("deleteAttachment", data);
    return result;
  }
};

const mutations = {
  getDataAttachment(state, data) {
    state.attachments = data;
  },
  createAttachment(state, data) {
    state.attachments = [...state.attachments, data.files[0]];
  },
  updateRateAttachment(state, data) {
    let item = state.attachments.find(x => x.id === data);
    if (item.rate) {
      item.rate = false;
    } else {
      item.rate = true;
    }
  },
  deleteAttachment(state, data) {
    state.attachments = state.attachments.filter(x => x.id !== data.id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
