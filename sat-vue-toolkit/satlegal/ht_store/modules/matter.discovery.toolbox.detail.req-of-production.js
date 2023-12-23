import api from "../../api/matter.discovery.toolbox.detail.req-of-production";

const state = {
  dataProduction: [],
  totals: 0
};
const getters = {
  dataProduction: state => state.dataProduction,
  totals: state => state.totals
};

const actions = {
  async getDataProductionRequest({ commit }, data) {
    const result = await api.getDataProduction(data);
    commit("getDataProduction", result);
    return result;
  },
  async addProductionRequest({ commit }, data) {
    const result = await api.addProduction(data);
    commit("addProduction", result);
    return result;
  },
  async updateProductionRequest({ commit }, data) {
    api.updateProduction(data);
    commit("updateProduction", {
      id: data.idParams.productionId,
      ...data.body
    });
  },
  async removeProductionRequest({ commit }, data) {
    api.removeProduction(data);
    commit("removeProduction", data.productionId);
  }
};

const mutations = {
  getDataProduction(state, {results, count}) {
    state.dataProduction = results;
    state.totals = count;
  },
  addProduction(state, data) {
    state.dataProduction.unshift(data);
    state.totals++;
  },
  updateProduction(state, data) {
    state.dataProduction = state.dataProduction.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeProduction(state, id) {
    state.dataProduction = state.dataProduction.filter(x => x.id !== id);
    state.totals--;
  },
  cleanUpPageData(state) {
    state.dataProduction = [];
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
