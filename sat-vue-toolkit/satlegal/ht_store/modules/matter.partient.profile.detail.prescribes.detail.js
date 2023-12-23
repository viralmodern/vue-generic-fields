import api from "../../api/matter.partient.profile.detail.prescribes.detail";
import sideEffects from "./matter.patient.profile.detail.prescribes.detail.sideEffects";
const state = {
  dataPrescribesDetail: {}
};

const getters = {
  dataPrescribesDetail: state => state.dataPrescribesDetail
};

const actions = {
  async getDataPrescribesDetailRequest({ commit }) {
    const result = await api.getDataPrescribesDetail();
    commit("getDataPrescribesDetail", result);
    return result;
  },
  updatePrescribesDetailRequest({ commit }, data) {
    api.updatePrescribesDetail(data);
    commit("updatePrescribesDetail", data);
  }
};

const mutations = {
  getDataPrescribesDetail(state, data) {
    state.dataPrescribesDetail = data;
  },
  updatePrescribesDetail(state, data) {
    state.dataPrescribesDetail = { ...state.dataPrescribesDetail, ...data };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    sideEffects
  }
};
