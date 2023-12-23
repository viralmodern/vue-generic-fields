import plans from "./setting.plans";
import billing from "./setting.billing";
// initial state
// shape: [{ id, quantity }]
const state = {};

// getters
const getters = {};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    plans,
    billing
  }
};
