import api from "../../api/task";
import detail from "./task.detail";
import list from "./task.list";

const state = {
  dataTaskAssignedToMe: [],
  dataTaskManagedByMe: [],
  dataTask: [],
  dataTaskProject: [],
  loading: false,
  loadingDataTask: false
};

// getters
const getters = {
  dataTaskAssignedToMe: state => state.dataTaskAssignedToMe,
  loading: state => state.loading,
  dataTaskProject: state => state.dataTaskProject,
  loadingDataTask: state => state.loadingDataTask
};

// actions
const actions = {
  async getDataAssignedToMeRequest({ commit }) {
    commit("setLoading", true);
    commit("getDataAssignedToMeSuccess", await api.getListTask());
    commit("setLoading", false);
  },
  async getDataManagedByMeRequest({ commit }) {
    commit("setLoading", true);
    commit("getDataManagedByMeSuccess", await api.getListTaskManageByMe());
    commit("setLoading", false);
  },
  async getTasksByProjectId({ commit }, id) {
    commit("getDataTaskByProject", await api.getTaskOfProject(id));
  }
};

// mutations
const mutations = {
  getDataAssignedToMeSuccess(state, data) {
    state.dataTaskAssignedToMe = data.dataTaskAssignedToMe;
  },
  getDataManagedByMeSuccess(state, data) {
    state.dataTaskManagedByMe = data.dataTaskManagedByMe;
  },
  getDataTaskSuccess(state, data) {
    state.dataTask = data.dataTasks;
  },
  setLoading(state, status) {
    state.loading = status;
  },
  getDataTaskByProject(state, data) {
    state.dataTaskProject = data.dataTask;
  },
  cleanUpPageData(state) {
    state.dataTaskAssignedToMe = [];
    state.dataTaskManagedByMe = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    detail,
    list
  }
};
