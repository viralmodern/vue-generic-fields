import api from "../../api/task.detail";

const state = {
  dataAttachment: []
};

const getters = {
  dataAttachment: state => state.dataAttachment
};

const actions = {
  async getDataAttachmentRequest({ commit }) {
    commit("getDataAttachment", await api.getAttachment());
  }
};

const mutations = {
  getDataAttachment(state, dataAttachment) {
    state.dataAttachment = dataAttachment;
  },
  addFilesAttachment(state, files) {
    state.dataAttachment = [...state.dataAttachment, ...files];
  },
  removeAttachment(state, id) {
    state.dataAttachment = state.dataAttachment.filter(x => x.id !== id);
  },
  updateRateAttachment(state, id) {
    state.dataAttachment = state.dataAttachment.map(x => {
      if (x.id === id) {
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
