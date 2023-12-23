import api from "../../api/matter.riskSource";

const state = {
  dataRiskSource: []
};
const getters = {
  dataRiskSource: state => state.dataRiskSource
};

const actions = {
  async getDataRiskSourceRequest({ commit }, data = {}) {
    const result =  await api.getDataRiskSource(data);
    commit("getDataRiskSource", result);
    return result;
  },
  async addRiskSourceRequest({ commit }, data = {}) {
    const result = await api.addRiskSource(data);
    commit("addRiskSource", result)
  },
  async updateRiskSourceRequest({ commit }, data = {}) {
    const result = await api.updateRiskSource(data);
    commit("updateRiskSource", result)
  },
  async removeRiskSourceRequest({ commit }, data = {}) {
    api.removeRiskSource(data);
    commit("removeRiskSource", data.id)
  },
};

const mutations = {
  getDataRiskSource(state, data) {
    state.dataRiskSource = data;
  },
  addRiskSource(state, data) {
    state.dataRiskSource = [...state.dataRiskSource, data]
  },
  updateRiskSource(state, data) {
    state.dataRiskSource = state.dataRiskSource.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeRiskSource(state, id) {
    state.dataRiskSource = state.dataRiskSource.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
