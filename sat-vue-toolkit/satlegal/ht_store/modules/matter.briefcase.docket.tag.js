import api from "../../api/docket.tag";

const state = {
  tags: []
};
const getters = {
  tags: state => state.tags
};

const actions = {
  async getDataTagDocketRequest({ commit }) {
    commit("getDataTagDocket", await api.getDataTagDocket());
  },
  async addTagsRequest({ commit }, data) {
    commit("addTags", data, await api.addTags(data))
  },
  async updateTagsRequest({ commit }, data) {
    commit("updateTags", data, await api.updateTags(data))
  },
  async removeTagsRequest({ commit }, data) {
    commit("removeTags", data, await api.removeTags(data))
  }
};

const mutations = {
  getDataTagDocket(state, data) {
    state.tags = data;
  },
  addTags(state, data) {
    state.tags = [...state.tags, data]
  },
  updateTags(state, data) {
    var issue = state.tags.find(x => x.id === data.id);
    issue.name = data.labelName;
    issue.color = data.colorValue;
  },
  removeTags(state, id) {
    state.tags = state.tags.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
