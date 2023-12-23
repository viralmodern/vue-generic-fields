import api from "../../api/matter.document";

const state = {
  dataDocument: []
}

const getters = {
  dataDocument: state => state.dataDocument
}

const actions = {
  async getDataDocument({ commit }) {
    commit("getDataDocument", await api.getDataDocument())
  },
  async selectMultiple({ commit }, data) {
    commit("selectMultiple", data)
  }
}

const mutations = {
  getDataDocument(state, dataDocument) {
    state.dataDocument = dataDocument
  },
  selectMultiple(state, data) {
    state.dataDocument = state.dataDocument.map(x => {
      if (x.id === data.id) {
        return { ...x, isActive: !x.isActive }
      }
      return x;
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
