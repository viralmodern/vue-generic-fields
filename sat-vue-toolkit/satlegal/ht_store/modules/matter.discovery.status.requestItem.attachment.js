import api from "../../api/matter.discovery.status.requestItem.attachment";

const state = {
  dataAttachment: []
};
const getters = {
  dataAttachment: state => state.dataAttachment
};

const actions = {
  async getDataAttachmentRequest({ commit }) {
    const result = await api.getDataAttachment();
    commit("getDataAttachment", result);
    return result;
  },
  async addAttachmentRequest({ commit }, data) {
    const result = await api.addAttachment(data);
    commit("addAttachment", result);
    return result;
  },
  async updateAttachmentRequest({ commit }, data) {
    const result = await api.updateAttachment(data);
    commit("updateAttachment", result);
    return result;
  },
  async removeAttachmentRequest({ commit }, id) {
    const result = await api.removeAttachment(id);
    commit("removeAttachment", result);
    return result;
  }
};

const mutations = {
  getDataAttachment(state, data) {
    state.dataAttachment = data;
  },
  addAttachment(state, data) {
    state.dataAttachment = [...state.dataAttachment, ...data];
  },
  updateAttachment(state, data) {
    state.dataAttachment = state.dataAttachment.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeAttachment(state, id) {
    state.dataAttachment = state.dataAttachment.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
