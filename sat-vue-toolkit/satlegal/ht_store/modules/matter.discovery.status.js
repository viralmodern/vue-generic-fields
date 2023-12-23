import requestItem from "./matter.discovery.status.request-item";
import requestSets from "./matter.discovery.status.requestSets";
import requestTask from "./matter.discovery.status.requestTask";

const state = {};
const getters = {};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    requestItem,
    requestSets,
    requestTask
  }
};
