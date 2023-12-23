import api from "../../api/project.resources.project";
const state = {
  boards: []
};

const getters = {
  boards: state => state.boards
};

const actions = {
  async getBoards({ commit }) {
    commit("populateBoards", await api.getBoards())
  }
};

const mutations = {
  populateBoards(state, boards){
    state.boards = boards;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
