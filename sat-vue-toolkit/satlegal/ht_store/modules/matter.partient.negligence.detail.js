import api from "../../api/matter.partient.negligence.detail";
import comment from "./matter.partient.negligence.detail.comment";
import checklist from "./matter.partient.negligence.detail.checklist";
import note from "./matter.discovery.evidences.detail.note";
import worklog from "./matter.partient.negligence.detail.worklog";
import injury from "./matter.partient.negligence.detail.injury";
import damage from "./matter.partient.negligence.detail.damage";

const state = {
  dataNegligenceDetail: {}
};

const getters = {
  dataNegligenceDetail: state => state.dataNegligenceDetail
};

const actions = {
  async getDataNegligenceDetailRequest({ commit }, id) {
    const result = await api.getDataNegligenceDetail(id);
    commit("getDataNegligenceDetail", result);
    return result;
  },
  async updateNegligenceRequest({ commit }, data) {
    const result = await api.updateNegligence(data);
    commit("updateNegligence", result);
    return result;
  }
};

const mutations = {
  getDataNegligenceDetail(state, data) {
    state.dataNegligenceDetail = data;
  },
  updateNegligence(state, data) {
    state.dataNegligenceDetail = { ...state.dataNegligenceDetail, ...data };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    comment,
    checklist,
    note,
    worklog,
    injury,
    damage
  }
};
