import api from "../../api/partialAllCharacters";

const state = {
  dataAllCharacter: []
};

const getters = {
  dataAllCharacter: state => state.dataAllCharacter
};

const actions = {
  async getAllCharacter({ commit }, matterId) {
    const result = await api.getAllCharacter(matterId);
    commit("getAllCharacter", result);
    return result;
  }
};

const mutations = {
  getAllCharacter(state, results) {
    state.dataAllCharacter = results;
  }
};

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
};
