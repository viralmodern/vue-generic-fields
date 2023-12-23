import api from "../../api/matter.discovery.deposition.preparation.priorExperience";
import attachment from "./matter.discovery.deposition.preparation.priorExperience.attachment";
const state = {
  dataPriorExperience: [],
  isLoadingGet: false,
  totals: 0,
};

const getters = {
  dataPriorExperience: state => state.dataPriorExperience,
  isLoadingGet: state => state.isLoadingGet,
  totals: state => state.totals,
};

const actions = {
  async getDataPriorExperienceRequest({ commit }, data = {}) {
    commit("setLoading", true);
    const result = await api.getDataPriorExperience(data);
    commit("getDataPriorExperience", result);
    commit("setLoading", false);
    return result;
  },
  async updatePriorExperienceRequest({ commit }, data) {
    const result = api.updateDataPriorExperience(data);
    commit("updatePriorExperience", {
      id: data.idParams.priorExperienceId,
      body: data.body
    });
    return result;
  },
  async updatePriorExperienceAsyncRequest({ commit }, data) {
    const result = await api.updateDataPriorExperience(data);
    const map = {
      id: data.idParams.priorExperienceId,
      body: result
    };
    commit("updatePriorExperience", map);
  },
  async addPriorExperienceRequest({ commit }, data) {
    const result = await api.addDataPriorExperience(data);
    commit("addPriorExperience", result);
    return result;
  },
  async removePriorExperienceRequest({ commit }, data) {
    const result = await api.removePriorExperience(data);
    commit("removePriorExperience", data.priorExperienceId);
    return result;
  }
};

const mutations = {
  getDataPriorExperience(state, data) {
    state.dataPriorExperience = data.results;
    state.totals = data.count;
  },
  updatePriorExperience(state, data) {
    state.dataPriorExperience = state.dataPriorExperience.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data.body };
      }
      return x;
    });
  },
  addPriorExperience(state, data) {
    state.dataPriorExperience.push(data);
  },
  removePriorExperience(state, id) {
    state.dataPriorExperience = state.dataPriorExperience.filter(
      x => x.id !== id
    );
  },
  setLoading(state, status) {
    state.isLoadingGet = status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    attachment
  }
};
