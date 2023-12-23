import list from "./list";
import witness from "./witness";
import witnessReliability from "./witness-reliability";
import witnessSustainability from "./witness-sustainability/"
// initial state
const state = {};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    list,
    witness,
    witnessReliability,
    witnessSustainability
  }
};
