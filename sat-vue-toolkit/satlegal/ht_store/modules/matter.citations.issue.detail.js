import api from "../../api/matter.citations.issue.detail";
import comment from "./matter.citations.issue.detail.comment";
import checklist from "./matter.citations.issue.detail.checklist";
import note from "./matter.citations.issue.detail.note";
import tag from "./matter.citations.issue.detail.tag";
import attachment from "./matter.citations.issue.detail.attachment";
import questionToAnswer from "./matter.citations.issue.detail.questionToAnswer";
import relatedFacts from "./matter.citations.issue.detail.relatedFacts";

const state = {
  dataIssueDetail: {}
};

const getters = {
  dataIssueDetail: state => state.dataIssueDetail
};

const actions = {
  async getDataIssueDetailRequest({ commit }, id) {
    const result = await api.getDataIssueDetail(id);
    commit("getDataIssueDetail", result);
    return result;
  },
  async updateIssueDetailRequest({ commit }, data) {
    const result = await api.updateIssueDetail(data);
    commit("updateIssueDetail", result);
    return result;
  }
};

const mutations = {
  getDataIssueDetail(state, data) {
    state.dataIssueDetail = data;
  },
  updateIssueDetail(state, data) {
    state.dataIssueDetail = { ...state.dataIssueDetail, ...data };
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
    attachment,
    questionToAnswer,
    relatedFacts
  }
};
