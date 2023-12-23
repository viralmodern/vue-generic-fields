import api from "../../api/citation.detail";
import comment from "./matter.citations.detail.comment"
import checklist from "./matter.citations.detail.checklist"
import notes from "./matter.citations.detail.notes"
import tag from "./matter.citations.detail.tag"
import casebrief from "./matter.citations.detail.casebrief"

const state = {
  dataCitationDetail: {}
};
const getters = {
  dataCitationDetail: state => state.dataCitationDetail
};

const actions = {
  async getDataCitationDetailRequest({ commit }) {
    const result = await api.getCitationDetail();
    commit("getDataCitationDetail", result);
    return result;
  },
  async updateCitationsRequest({ commit }, data) {
    const result = await api.updateCitaions(data);
    commit("updateCitations", result);
    return result;
  }
};

const mutations = {
  getDataCitationDetail(state, data) {
    state.dataCitationDetail = data;
  },
  updateCitations(state, data) {
    state.dataCitationDetail = { ...state.dataCitationDetail, ...data };
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
    notes,
    tag,
    casebrief
  }
};
