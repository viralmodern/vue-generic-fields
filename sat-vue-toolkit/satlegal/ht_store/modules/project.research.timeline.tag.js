import api from "../../api/project.research.timeline.tag";

const state = {
  tags: []
};

const getters = {
  tags: state => state.tags
};

const actions = {
  async getDataTagsRequest({ commit }) {
    commit("getDataTags", await api.getDataTags());
  }
};

const mutations = {
  getDataTags(state, data) {
    state.tags = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
