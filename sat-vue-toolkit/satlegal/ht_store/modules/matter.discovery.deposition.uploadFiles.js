import api from "../../api/matter.discovery.deposition.uploadFiles";


const state = {
  respTranscript: {},
}

const getters = {
  respTranscript: state => state.respTranscript,
}

const actions = {
  async getAllFiles({ commit }, req) {
    commit("getAllFiles", await api.getAllFiles(req));
  },
  async uploadFiles({ commit }, req) {
    commit("uploadFiles", await api.uploadFiles(req));
  }
}

const mutations = {
  getAllFiles(state, resp) {
    state.respTranscript = resp;
  },
  uploadFiles(state, resp) {
    state.respTranscript = resp;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
