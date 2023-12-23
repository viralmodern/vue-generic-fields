import api from "../../api/task.list.citation";

const state = {
  status: false,
  message: ""
};

const getters = {
  status: state => state.status,
  message: state => state.message
};

const actions = {
  async addDataCitationRequest({ commit }) {
    const result = await api.addDataCitation();
    commit("handleActionSuccess", result);
    return result;
  },
  async updateDataCitationRequest({ commit }) {
    const result = await api.updateDataCitation();
    commit("handleActionSuccess", result);
    return result;
  },
  async deleteDataCitationRequest({ commit }) {
    const result = await api.deleteDataCitation();
    commit("handleActionSuccess", result);
    return result;
  }
};

const mutations = {
  handleActionSuccess(state, data) {
    state.status = data.status;
    state.message = data.message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
