import api from "../../api/task.detail";

const state = {
  dataActivities: []
};

const getters = {
  dataActivities: state => state.dataActivities
};

const actions = {
  async getDataActivitiesRequest({ commit }) {
    commit("getDataActivities", await api.getActivities());
  }
};

const mutations = {
  getDataActivities(state, dataActivities) {
    state.dataActivities = dataActivities;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
