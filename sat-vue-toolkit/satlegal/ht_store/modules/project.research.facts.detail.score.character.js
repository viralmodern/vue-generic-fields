import api from "../../api/project.research.facts.detail.score.character";
const state = {};

const getters = {};

const actions = {
  async updateCharacterRequest({ commit }, data) {
    const result = await api.updateCharacterRequest(data);
    commit("project/research/facts/detail/updateCharacter", result, { root: true });
    return result;
  }
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
