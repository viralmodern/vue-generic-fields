import api from "../../api/project.research.facts.detail.score.evidence";
const state = {};

const getters = {};

const actions = {
  async updateEvidenceRequest({ commit }, data) {
    const result = await api.updateEvidenceRequest(data);
    commit("project/research/facts/detail/updateEvidence", result, { root: true });
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
