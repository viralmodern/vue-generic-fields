import api from "../../api/project.resources.team";
const state = {
  teams: []
};

const getters = {
  teams: state => state.teams
};

const actions = {
  async getTeams({ commit }) {
    commit("populateTeams", await api.getTeams())
  }
};

const mutations = {
  populateTeams(state, teams){
    state.teams = teams;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
