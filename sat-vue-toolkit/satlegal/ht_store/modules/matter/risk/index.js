import actionEntry from "./actionEntry";
import register from "./register"

const actions = {};
const getters = {};
const mutations = {};
const state = {};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  modules: {
    actionEntry,
    register,
  }
};
