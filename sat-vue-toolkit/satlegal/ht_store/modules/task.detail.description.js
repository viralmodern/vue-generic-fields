import api from "../../api/task.detail";

const state = {
  taskDetail: {},
  itemsCompelete: [],
  itemsFeature: [],
  itemsWorks: []
};

const getters = {
  taskDetail: state => state.taskDetail,
  itemsCompelete: state => state.itemsCompelete,
  itemsFeature: state => state.itemsFeature,
  itemsWorks: state => state.itemsWorks
};

const actions = {
  async getDataTaskDetailRequest({ commit }) {
    commit("getDataTaskDetail", await api.getDetailTask());
  },
  async getListCompeleteRequest({ commit }) {
    commit("fetchListComplete", await api.getListCompelete());
  },
  async getListsFeatureRequest({ commit }) {
    commit("fetchListFeature", await api.getListsFeature());
  },
  async getListsWorksRequest({ commit }) {
    commit("getListsWorks", await api.getListsWorks());
  }
};

const mutations = {
  getDataTaskDetail(state, taskDetail) {
    state.taskDetail = taskDetail;
  },
  changeVulnerability(state, data) {
    state.taskDetail.selects.vulnerability = data;
  },
  changeFavorable(state, data) {
    state.taskDetail.selects.favorable = data;
  },
  changeTreatment(state, data) {
    state.taskDetail.selects.treatment = data;
  },
  fetchListComplete(state, itemsCompelete) {
    state.itemsCompelete = itemsCompelete;
  },
  fetchListFeature(state, itemsFeature) {
    state.itemsFeature = itemsFeature;
  },
  getListsWorks(state, itemsWorks) {
    state.itemsWorks = itemsWorks;
  },
  changeEstimate(state, data) {
    state.taskDetail.estimate = data;
  },
  changeLimitation(state, data) {
    state.taskDetail.selects.limitation = data;
  },
  changeFeature(state, data) {
    state.taskDetail.feature = data;
  },
  changeCompelete(state, data) {
    state.taskDetail.compelete = data;
  },
  changeStatusWork(state, data) {
    state.taskDetail.statusWork = data;
  },
  editTitle(state, data) {
    state.taskDetail.title = data;
  },
  editDescription(state, data) {
    state.taskDetail.description = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
