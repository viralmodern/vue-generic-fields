
import api from "../../api/project.list";

const state = {
  projects: []
};

const getters = {
  projects: state => state.projects
};

const actions = {
  async getDataProjectRequest({ commit }) {
    commit("getDataProject", await api.getProjects());
  }
};

const mutations = {
  getDataProject(state, data) {
    state.projects = data;
  },
  createProject(state, data){
    state.projects.push(data)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
