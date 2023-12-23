import productionEntries from "./productionEntries";
import subpoenaSet from "./subpoenaSet";
import subpoenaProduction from "./subpoenaProduction";
import subpoenaDefiAndInstrucs from "./subpoenaDefiAndInstrucs";

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
    productionEntries,
    subpoenaSet,
    subpoenaProduction,
    subpoenaDefiAndInstrucs
  }
};
