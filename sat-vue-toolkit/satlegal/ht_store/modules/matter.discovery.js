import evidences from "./matter.discovery.evidences";
import log from "./matter.discovery.log";
import toolbox from "./matter.discovery.toolbox";
import filters from "./matter.discovery.evidences.filter";
import summary from "./matter.discovery.summary";
import index from "./matter.discovery.index";
import filtersIndex from "./matter.discovery.index.filters";
import status from "./matter.discovery.status";
import deposition from "./matter.discovery.deposition";

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
    evidences,
    log,
    toolbox,
    filters,
    summary,
    index,
    filtersIndex,
    status,
    deposition
  }
};
