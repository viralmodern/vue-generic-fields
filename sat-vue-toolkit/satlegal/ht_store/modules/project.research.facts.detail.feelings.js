import api from "../../api/project.research.facts.detail.feelings";

const state = {
  dataFeelings: []
};

const getters = {
  dataFeelings: state => state.dataFeelings
};

const actions = {
  async getDataFeelingsRequest({ commit }) {
    commit("getDataFeelings", await api.getDataFeelings());
  },
  async addDataFeelingsRequest({ commit }, data) {
    commit("addDataFeelings", data);
  },
  async updateDataFeelingsRequest({ commit }, data) {
    commit("updateDataFeelings", data);
  }

};

const mutations = {
  getDataFeelings(state, dataFeelings) {
    state.dataFeelings = dataFeelings;
  },
  addDataFeelings(state, data) {
    state.dataFeelings.push(data)
  },
  updateDataFeelings(state, data) {
    state.dataFeelings.find(x => x.id === data.id).comment = data.comment;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
