import api from "../../api/project.document";
import detail from "./project.document.detail";
const state = {
  dataPeopelWorking: [],
  dataAttachment: []
};

const getters = {
  dataPeopelWorking: state => state.dataPeopelWorking,
  dataAttachment: state => state.dataAttachment
};

const actions = {
  async getDataPeopelWorkingRequest({ commit }) {
    commit("getDataPeopelWorkingSuccess", await api.getDataPeopelWorking());
  },
  async getDataAttachmentRequest({ commit }) {
    commit("getDataAttachmentSuccess", await api.getDataAttachment());
  }
};

const mutations = {
  getDataPeopelWorkingSuccess(state, data) {
    state.dataPeopelWorking = data;
  },
  getDataAttachmentSuccess(state, data) {
    state.dataAttachment = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    detail
  }
};
