import api from "../../api/injury-detail-proximate";
const state = {
  proximate: []
};
const getters = {
  proximate: state => state.proximate
};

const actions = {
  async getDataProximateRequest({ commit }) {
    commit("getDataProximate", await api.getDataProximate());
  },
  async editDataProximateRequest({ commit }, data) {
    const result = await api.updateDataProximate(data);
    commit("editDataProximate", data);
    return result;
  },
  async removeProximateRequest({ commit }, data) {
    commit("removeProximate", data, await api.deleteDataProximate(data));
  }
};

const mutations = {
  getDataProximate(state, data) {
    state.proximate = data;
  },
  editDataProximate(state, data) {
    const item = state.proximate.find(x => x.id === data.parentId);
    item[data.column] = data.value;
  },
  removeProximate(state, id) {
    state.proximate = state.proximate.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
