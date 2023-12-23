import api from "../../api/matter.riskArea";

const state = {
  dataRiskArea: []
};
const getters = {
  dataRiskArea: state => state.dataRiskArea
};

const actions = {
  async getDataRiskAreaRequest({ commit }, data = {}) {
    const result =  await api.getDataRiskArea(data);
    commit("getDataRiskArea", result);
    return result;
  },
  async addRiskAreaRequest({ commit }, data = {}) {
    const result = await api.addRiskArea(data);
    commit("addRiskArea", result)
  },
  async updateRiskAreaRequest({ commit }, data = {}) {
    const result = await api.updateRiskArea(data);
    commit("updateRiskArea", result)
  },
  async removeRiskAreaRequest({ commit }, data = {}) {
    api.removeRiskArea(data);
    commit("removeRiskArea", data.id)
  },
};

const mutations = {
  getDataRiskArea(state, data) {
    state.dataRiskArea = data;
  },
  addRiskArea(state, data) {
    state.dataRiskArea = [...state.dataRiskArea, data]
  },
  updateRiskArea(state, data) {
    state.dataRiskArea = state.dataRiskArea.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeRiskArea(state, id) {
    state.dataRiskArea = state.dataRiskArea.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
