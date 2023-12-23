import api from "../../api/matter.partient.injury.detail";
import comment from "./matter.partient.injury.detail.comment";
import checklist from "./matter.partient.injury.detail.checklist";
import note from "./matter.partient.injury.detail.note";
import proximate from "./matter.partient.injury.detail.proximate";

const state = {
  dataInjuryDetail: {}
};

const getters = {
  dataInjuryDetail: state => state.dataInjuryDetail
};

const actions = {
  async getDataInjuryDetailRequest({ commit }, id) {
    const result = await api.getDataInjuryDetail(id);
    commit("getDataInjuryDetail", result);
    return result;
  },
  async updateInjuryRequest({ commit }, data) {
    const result = await api.updateInjury(data);
    commit("updateInjury", result);
    return result;
  }
};

const mutations = {
  getDataInjuryDetail(state, data) {
    state.dataInjuryDetail = data;
  },
  updateInjury(state, data) {
    state.dataInjuryDetail = { ...state.dataInjuryDetail, ...data };
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
    proximate
  }
};
