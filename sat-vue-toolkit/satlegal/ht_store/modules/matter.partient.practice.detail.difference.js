import api from "../../api/injury-detail-differences";
const state = {
  differences: []
};
const getters = {
  differences: state => state.differences
};

const actions = {
  async getDataDifferenceRequest({ commit }) {
    commit("getDataDifference", await api.getDataDifference());
  },
  async editDataDifferenceRequest({ commit }, data) {
    const result = await api.updateDataDifference(data);
    commit("editDataDifference", data);
    return result;
  },
  async removeDifferenceRequest({ commit }, data) {
    commit("removeDifference", data, await api.deleteDataDifference(data));
  }
};

const mutations = {
  getDataDifference(state, data) {
    state.differences = data;
  },
  editDataDifference(state, data) {
    const item = state.differences.find(x => x.id === data.parentId);
    item[data.column] = data.value;
  },
  removeDifference(state, id) {
    state.differences = state.differences.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
