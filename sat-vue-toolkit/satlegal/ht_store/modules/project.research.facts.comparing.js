import api from "../../api/project.research.facts.comparing";

const state = {
  dataDifferences: [],
  totals_differences: 0,
  dataSimilarities: [],
  totals_Similarities: 0
};
const getters = {
  // Differences
  dataDifferences: state => state.dataDifferences,
  totals_differences: state => state.totals_differences,
  // Similarities
  dataSimilarities: state => state.dataSimilarities,
  totals_Similarities: state => state.totals_Similarities,
};

const actions = {
  // Differences
  async getFactsDifferences({ commit }, data) {
    const result = await api.getFactsDifferences(data);
    commit("getFactsDifferences", result);
  },
  async addFactsDifferences({ commit }, data) {
    const result = await api.addFactsDifferences(data);
    commit("addFactsDifferences", result);
  },
  async removeFactsDifferences({ commit }, data) {
    await api.removeFactsDifferences(data);
    commit("removeFactsDifferences", data);
  },
  async updateFactsDifferences({ commit }, data) {
    const result = await api.updateFactsDifferences(data);
    commit("updateFactsDifferences", result);
  },
  // Similarities
  async getFactsSimilarities({ commit }, data) {
    const result = await api.getFactsSimilarities(data);
    commit("getFactsSimilarities", result);
  },
  async addFactsSimilarities({ commit }, data) {
    const result = await api.addFactsSimilarities(data);
    commit("addFactsSimilarities", result);
  },
  async removeFactsSimilarities({ commit }, data) {
    await api.removeFactsSimilarities(data);
    commit("removeFactsSimilarities", data);
  },
  async updateFactsSimilarities({ commit }, data) {
    const result = await api.updateFactsSimilarities(data);
    commit("updateFactsSimilarities", result);
  }
};

const mutations = {
  // Differences
  getFactsDifferences(state, data) {
    state.dataDifferences = data.results;
    state.totals_differences = data.count;
  },
  addFactsDifferences(state, data) {
    state.dataDifferences.push(data);
  },
  removeFactsDifferences(state, data) {
    state.dataDifferences = state.dataDifferences.filter(
      x => x.pk !== data.diffsId
    );
  },
  updateFactsDifferences(state, data) {
    state.dataDifferences.find(x => x.pk === data.pk).desc = data.desc;
  },
  // Similarities
  getFactsSimilarities(state, data) {
    state.dataSimilarities = data.results;
    state.totals_Similarities = data.count;
  },
  addFactsSimilarities(state, data) {
    state.dataSimilarities.push(data);
  },
  removeFactsSimilarities(state, data) {
    state.dataSimilarities = state.dataSimilarities.filter(
      x => x.pk !== data.diffsId
    );
  },
  updateFactsSimilarities(state, data) {
    state.dataSimilarities.find(x => x.pk === data.pk).desc = data.desc;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
