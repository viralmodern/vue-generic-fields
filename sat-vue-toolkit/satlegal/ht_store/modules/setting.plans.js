

import api from '../../api/setting';

const state = {
  currentPlan: {},
  availablePlans: []
};

// getters
const getters = {
  settingPlan: state => (state.currentPlan || {}).settingPlan,
  settingTotal: state => (state.currentPlan || {}).settingTotal,
  availablePlansForYear: state => (state.availablePlans || []).filter(x => x.unit === 'YEAR'),
  availablePlansForMonth: state => (state.availablePlans || []).filter(x => x.unit === 'MON'),
};

const actions = {
  async getCurrentPlan({ commit }) {
    commit('populateCurrentPlan', await api.getCurrentPlan());
  },
  async getAvailablePlans({ commit }) {
    commit('populateAvailablePlans', await api.getAvailablePlans());
  }
};

const mutations = {
  populateCurrentPlan(state, plan) {
    state.currentPlan = plan;
  },
  populateAvailablePlans(state, plans) {
    state.availablePlans = plans;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
