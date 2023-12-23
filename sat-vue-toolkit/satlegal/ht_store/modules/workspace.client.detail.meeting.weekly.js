
import api from "../../api/workspace.client.detail.meeting";

const state = {
  dataMeetingWeekly: []
};

const getters = {
  dataMeetingWeekly: state => state.dataMeetingWeekly
};

const actions = {
  async getDataMeetingWeeklyRequest({ commit }) {
    commit("getDataMeetingWeeklySuccess", await api.getDataMeetingWeekly());
  }
};

const mutations = {
  getDataMeetingWeeklySuccess(state, dataMeetingWeekly) {
    state.dataMeetingWeekly = dataMeetingWeekly;
  },
  updatePinWeekly(state, id) {
    state.dataMeetingWeekly = state.dataMeetingWeekly.map(x => {
      if (x.id === id) {
        return { ...x, isPinned: !x.isPinned }
      }
      return x
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
