import api from "../../api/matter.discovery.toolbox.detail.deposition";

const state = {
  dataDeposition: [],
  totals: 0
};
const getters = {
  dataDeposition: state => state.dataDeposition,
  totals: state => state.totals
};

const actions = {
  async getDataDepositionRequest({ commit }, data) {
    const result = await api.getDataDeposition(data);
    commit("getDataDeposition", result);
    return result;
  },
  async addDepositionRequest({ commit }, data) {
    const result = await api.addDeposition(data);
    commit("addDeposition", result);
    return result;
  },
  async updateDepositionRequest({ commit }, data) {
    api.updateDeposition(data);
    commit("updateDeposition", {
      id: data.idParams.depositionId,
      ...data.body
    });
  },
  async removeDepositionRequest({ commit }, data) {
    api.removeDeposition(data);
    commit("removeDeposition", data.depositionId);
  }
};

const mutations = {
  getDataDeposition(state, { results, count }) {
    state.dataDeposition = results;
    state.totals = count;
  },
  addDeposition(state, data) {
    state.dataDeposition.unshift(data);
    state.totals++;
  },
  updateDeposition(state, data) {
    state.dataDeposition = state.dataDeposition.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeDeposition(state, id) {
    state.dataDeposition = state.dataDeposition.filter(x => x.id !== id);
    state.totals--;
  },
  cleanUpPageData(state) {
    state.dataDeposition = [];
    state.totals = 0;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
