import api from "../../api/task.detail.peopleGroup";

const state = {
  isLoading: false
};
const getters = {
  isLoading: state => state.isLoading
};

const actions = {
  async addGroupProjectRequest({ commit }, data) {
    commit("loadingSuccess", await api.creteGroupProject(data));
  },
  async deleteGroupPeopleRequest({ commit }, data) {
    commit("loadingSuccess", await api.creteGroupPeople(data));
  },
  async addMemberRowInGroupRequest({ commit }, data) {
    commit("loadingSuccess", await api.createMemberRowInGroup(data));
  },
  async removeMemberRowInGroupRequest({ commit }, data) {
    commit("loadingSuccess", await api.removeMemberRowInGroup(data));
  }
};

const mutations = {
  loadingSuccess(state, isLoading) {
    state.isLoading = isLoading;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
