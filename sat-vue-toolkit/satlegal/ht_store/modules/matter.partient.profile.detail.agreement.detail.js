import api from "../../api/matter.partient.profile.detail.agreement.detail";
import hightlight from "./matter.partient.profile.detail.agreementDetail.highlight";
import signature from "./matter.partient.profile.detail.agreementDetail.signature";

const state = {
  dataAgreementDetail: {}
};

const getters = {
  dataAgreementDetail: state => state.dataAgreementDetail
};

const actions = {
  async getDataAgreementDetailRequest({ commit }) {
    const result = await api.getDataAgreementDetail();
    commit("getDataAgreementDetail", result);
    return result;
  },
  updateAgreementDetailRequest({ commit }, data) {
    api.updateAgreementDetail(data);
    commit("updateAgreementDetail", data);
  }
};

const mutations = {
  getDataAgreementDetail(state, data) {
    state.dataAgreementDetail = data;
  },
  updateAgreementDetail(state, data) {
    state.dataAgreementDetail = { ...state.dataAgreementDetail, ...data };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    hightlight,
    signature
  }
};
