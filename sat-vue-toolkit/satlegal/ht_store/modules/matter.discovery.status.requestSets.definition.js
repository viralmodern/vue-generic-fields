import api from "../../api/matter.discovery.status.requestSets.definition";

const state = {
  dataDefinition: [],
  totals: 0
};
const getters = {
  dataDefinition: state => state.dataDefinition,
  totals: state => state.totals
};

const actions = {
  async getDataDefinitionRequest({ commit }, data) {
    const result = await api.getDataDefinition(data);
    commit("getDataDefinition", result);
    return result;
  },
  async addDefinitionRequest({ commit }, data) {
    const result = await api.addDefinition(data);
    commit("addDefinition", result);
    return result;
  },
  async updateDefinitionRequest({ commit }, data) {
    api.updateDefinition(data);
    commit("updateDefinition", {
      id: data.idParams.definitionId,
      ...data.body
    });
  },
  async removeDefinitionRequest({ commit }, data) {
    api.removeDefinition(data);
    commit("removeDefinition", data.definitionId);
  }
};

const mutations = {
  getDataDefinition(state, { results, count }) {
    state.dataDefinition = results;
    state.totals = count;
  },
  addDefinition(state, data) {
    state.dataDefinition.push(data);
    state.totals++;
  },
  updateDefinition(state, data) {
    state.dataDefinition = state.dataDefinition.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeDefinition(state, id) {
    state.dataDefinition = state.dataDefinition.filter(x => x.id !== id);
    state.totals--;
  },
  cleanUpPageData(state) {
    state.dataDefinition = [];
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
