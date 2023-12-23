import api from "../../api/matter.discovery.log.detail";
import type from "./matter.discovery.log.detail.type"
const state = {
  logDetail: {}
};
const getters = {
  logDetail: state => state.logDetail
};

const actions = {
  async getDataLogDetailRequest({ commit }, id) {
    commit("getDataLogDetail", await api.getDataLogDetail(id));
  },
  async addMemberLogDetailRequest({ commit }, data) {
    commit("addMemberLogDetail", data);
  },
  async removeMemberLogDetailRequest({ commit }, data) {
    commit("removeMemberLogDetail", data);
  },
  async changeDataInfomationLogRequest({ commit }, data) {
    commit("changeDataInfomationLog", data);
  }
};

const mutations = {
  getDataLogDetail(state, data) {
    state.logDetail = data;
  },
  changeDataInfomationLog(state, data) {
    state.logDetail = {...state.logDetail, ...data};
  },
  addMemberLogDetail(state, data) {
    state.logDetail.members.push(data.id);
  },
  removeMemberLogDetail(state, data) {
    state.logDetail.members = state.logDetail.members.filter(
      id => id !== data.id
    );
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    type
  }
};
