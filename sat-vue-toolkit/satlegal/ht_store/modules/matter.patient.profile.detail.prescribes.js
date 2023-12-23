import api from "../../api/matter.patient.profile.detail.prescribes";
import detail from "./matter.partient.profile.detail.prescribes.detail";

const state = {
  dataPrescribes: []
};
const getters = {
  dataPrescribes: state => state.dataPrescribes
};

const actions = {
  async getDataPrescribesRequest({ commit }) {
    const result = await api.getDataPrescribes();
    commit("getDataPrescribes", result);
    return result;
  },
  async addPrescribesRequest({ commit }, data) {
    const result = await api.addPrescribes(data);
    result.id = Math.random();
    result.characters = [];
    result.facts = [];
    result.citations = [];
    commit("addPrescribes", result);
    return result;
  },
  updatePrescribesRequest({ commit }, data) {
    api.updatePrescribes(data);
    commit("updatePrescribes", data);
  },
  async removePrescribesRequest({ commit }, data) {
    const result = await api.removePrescribes(data);
    commit("removePrescribes", result);
    return result;
  }
};

const mutations = {
  getDataPrescribes(state, data) {
    state.dataPrescribes = data;
  },
  addPrescribes(state, data) {
    state.dataPrescribes.unshift(data);
  },
  updatePrescribes(state, data) {
    state.dataPrescribes = state.dataPrescribes.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removePrescribes(state, id) {
    state.dataPrescribes = state.dataPrescribes.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    detail
  }
};
