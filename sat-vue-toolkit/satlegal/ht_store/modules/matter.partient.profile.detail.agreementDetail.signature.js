import api from "../../api/matter.partient.profile.detail.agreementDetail.signature";

const state = {
  dataSignature: []
};
const getters = {
  dataSignature: state => state.dataSignature
};

const actions = {
  async getDataSignatureRequest({ commit }) {
    const result = await api.getDataSignature();
    commit("getDataSignature", result);
    return result;
  },
  async updateSignatureRequest({ commit }, data) {
    const result = await api.updateSignature(data);
    commit("updateSignature", result);
    return result;
  }
};

const mutations = {
  getDataSignature(state, data) {
    state.dataSignature = data;
  },
  updateSignature(state, data) {
    state.dataSignature = state.dataSignature.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
