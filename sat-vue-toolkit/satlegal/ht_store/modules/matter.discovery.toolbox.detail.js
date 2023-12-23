import api from "../../api/matter.discovery.toolbox.detail";
import definition from "./matter.discovery.toolbox.detail.definition";
import instruction from "./matter.discovery.toolbox.detail.instruction";
import generalObjection from "./matter.discovery.toolbox.detail.generalObjection";
import requestOfProduction from "./matter.discovery.toolbox.detail.req-of-production";
import requestOfAdmission from "./matter.discovery.toolbox.detail.req-of-admission";
import requestOfToolbox from "./matter.discovery.toolbox.detail.req-of-admission";
import interrogatory from "./matter.discovery.toolbox.detail.interrogatory";
import deposition from "./matter.discovery.toolbox.detail.deposition";

const state = {
  dataToolboxDetail: {}
};
const getters = {
  dataToolboxDetail: state => state.dataToolboxDetail
};

const actions = {
  async getDataToolboxRequest({ commit }, data) {
    const result = await api.getDataToolbox(data);
    commit("getDataToolbox", result);
    return result;
  },
  async updateToolboxRequest({ commit }, data) {
    api.updateToolbox(data);
    commit("updateToolbox", data);
  }
};

const mutations = {
  getDataToolbox(state, data) {
    state.dataToolboxDetail = data;
  },
  updateToolbox(state, data) {
    state.dataToolboxDetail = { ...state.dataToolboxDetail, ...data };
  },
  cleanUpPageData(state) {
    state.dataToolboxDetail = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    definition,
    instruction,
    generalObjection,
    requestOfProduction,
    requestOfAdmission,
    requestOfToolbox,
    interrogatory,
    deposition
  }
};
