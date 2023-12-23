import api from "../../api/matter.labels.document";

const state = {
  dataDocumentLabel: []
};

const getters = {
  dataDocumentLabel: state => state.dataDocumentLabel
};

const actions = {
  async getDataDocumentLabelRequest({ commit }, data = {}) {
    const result = await api.getDataDocumentLabel(data);
    commit("getDataDocumentLabel", await api.getDataDocumentLabel(data));
    return result;
  },
  async addDocumentLabelRequest({ commit }, data = {}) {
    const result = await api.addDocumentLabel(data);
    commit("addDocumentLabel", result)
  },
  async updateDocumentLabelRequest({ commit }, data = {}) {
    const result = await api.updateDocumentLabel(data);
    commit("updateDocumentLabel", result)
  },
  async removeDocumentLabelRequest({ commit }, data = {}) {
    api.removeDocumentLabel(data);
    commit("removeDocumentLabel", data.id)
  },
};

const mutations = {
  getDataDocumentLabel(state, data) {
    state.dataDocumentLabel = data;
  },
  addDocumentLabel(state, data) {
    state.dataDocumentLabel = [...state.dataDocumentLabel, data]
  },
  updateDocumentLabel(state, data) {
    state.dataDocumentLabel = state.dataDocumentLabel.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeDocumentLabel(state, id) {
    state.dataDocumentLabel = state.dataDocumentLabel.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
