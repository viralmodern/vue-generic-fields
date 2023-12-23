import api from "../../api/matter.discovery.evidences.detail";
import comment from "./matter.discovery.evidences.detail.comment";
import checklist from "./matter.discovery.evidences.detail.checklist";
import note from "./matter.discovery.evidences.detail.note";
import tag from "./matter.discovery.evidences.detail.tag";
import attachment from "./matter.discovery.evidences.detail.attachment";

const state = {
  dataEvidencesDetail: {}
};

const getters = {
  dataEvidencesDetail: state => state.dataEvidencesDetail
};

const actions = {
  async getDataEvidencesDetailRequest({ commit }, id) {
    const result = await api.getDataEvidencesDetail(id);
    commit("getDataEvidencesDetail", result);
    return result;
  },
  async updateEvidencesRequest({ commit }, data) {
    const result = await api.updateEvidences(data);
    commit("updateEvidences", result);
    return result;
  }
};

const mutations = {
  getDataEvidencesDetail(state, data) {
    state.dataEvidencesDetail = data;
  },
  updateEvidences(state, data) {
    state.dataEvidencesDetail = { ...state.dataEvidencesDetail, ...data };
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
    tag,
    attachment
  }
};
