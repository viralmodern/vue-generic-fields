import api from "../../api/matter.references.detail";

const state = {
  dataReferencesDetail: {}
};

const getters = {
  dataReferencesDetail: state => state.dataReferencesDetail
};

const actions = {
  async getDataReferencesDetailRequest({ commit }, id) {

    const result = await api.getDataReferencesDetail(id);
    commit("getDataReferencesDetail", result);
    return result;
  },
  async updateReferencesRequest({ commit }, data) {
    const result = await api.updateReferences(data);
    commit("updateReferences", result);
    return result;
  }
};

const mutations = {
  getDataReferencesDetail(state, data) {
    state.dataReferencesDetail = data;
  },
  updateReferences(state, data) {
    state.dataReferencesDetail[data.column] = data.value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
