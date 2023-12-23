import api from "../../api/character.profile.linked.character";

const state = {
  dataLinkedCharacter: []
};

const getters = {
  dataLinkedCharacter: state => state.dataLinkedCharacter
};

const actions = {
  async getDataLinkedCharacter({ commit }) {
    commit("getDataLinkedCharacter", await api.getDataLinkedCharacter())
  }
};

const mutations = {
  getDataLinkedCharacter(state, dataLinkedCharacter) {
    state.dataLinkedCharacter = dataLinkedCharacter
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
