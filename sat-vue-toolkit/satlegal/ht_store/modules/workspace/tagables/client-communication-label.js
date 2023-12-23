import api from "@/sat-vue-toolkit/satlegal/api/workspace/tagables/client-communication-label";

const state = {
  dataCommunicationLabel: []
};

const getters = {
  dataCommunicationLabel: state => state.dataCommunicationLabel
};

const actions = {
  async getDataCommunicationLabelRequest({ commit }, data = {}) {
    const result = await api.getDataCommunicationLabel(data);
    commit("getDataCommunicationLabel", await api.getDataCommunicationLabel(data));
    return result;
  },
  async addCommunicationLabelRequest({ commit }, data = {}) {
    const result = await api.addCommunicationLabel(data);
    commit("addCommunicationLabel", result)
  },
  async updateCommunicationLabelRequest({ commit }, data = {}) {
    const result = await api.updateCommunicationLabel(data);
    commit("updateCommunicationLabel", result)
  },
  async removeCommunicationLabelRequest({ commit }, data = {}) {
    api.removeCommunicationLabel(data);
    commit("removeCommunicationLabel", data.id)
  },
};

const mutations = {
  getDataCommunicationLabel(state, data) {
    state.dataCommunicationLabel = data;
  },
  addCommunicationLabel(state, data) {
    state.dataCommunicationLabel = [...state.dataCommunicationLabel, data]
  },
  updateCommunicationLabel(state, data) {
    state.dataCommunicationLabel = state.dataCommunicationLabel.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeCommunicationLabel(state, id) {
    state.dataCommunicationLabel = state.dataCommunicationLabel.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
