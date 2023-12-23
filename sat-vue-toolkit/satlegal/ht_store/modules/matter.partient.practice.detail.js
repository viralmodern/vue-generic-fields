import api from "../../api/matter.partient.practice.detail";
import comment from "./matter.partient.practice.detail.comment";
import checklist from "./matter.partient.practice.detail.checklist";
import note from "./matter.partient.practice.detail.note";
import practice from "./matter.partient.practice.detail.practice";
import difference from "./matter.partient.practice.detail.difference";

const state = {
  dataPracticeDetail: {}
};

const getters = {
  dataPracticeDetail: state => state.dataPracticeDetail
};

const actions = {
  async getDataPracticeDetailRequest({ commit }, id) {
    const result = await api.getDataPracticeDetail(id);
    commit("getDataPracticeDetail", result);
    return result;
  },
  async updatePracticeRequest({ commit }, data) {
    const result = await api.updatePractice(data);
    commit("updatePractice", result);
    return result;
  }
};

const mutations = {
  getDataPracticeDetail(state, data) {
    state.dataPracticeDetail = data;
  },
  updatePractice(state, data) {
    state.dataPracticeDetail = { ...state.dataPracticeDetail, ...data };
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
    practice,
    difference
  }
};
