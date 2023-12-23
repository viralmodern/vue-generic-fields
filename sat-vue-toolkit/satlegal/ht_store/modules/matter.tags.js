import api from "../../api/matter.tags";

const state = {
  tag: [],
  issue: [],
  subject: [],
  label: []
};

const getters = {
  tag: state => state.tag,
  issue: state => state.issue,
  subject: state => state.subject,
  label: state => state.label
};

const actions = {
  async getDataTagsRequest({ commit }, data = {}) {
    var result = await api.getDataTags(data)
    commit("getDataTags", { data, result });
  },
  async addTagsRequest({ commit }, data = {}) {
    const result = await api.addTags(data);
    commit("addTags", { data, result })
  },
  async updateTagsRequest({ commit }, data = {}) {
    const result = await api.updateTags(data);
    commit("updateTags", result)
  },
  async removeTagsRequest({ commit }, data = {}) {
    api.removeTags(data);
    commit("removeTags", data)
  },
};

const mutations = {
  getDataTags(state, resp) {
    state[resp.data.type] = resp.result;
  },
  addTags(state, resp) {
    state[resp.data.type] = [...state[resp.data.type], resp.result]
  },
  removeTags(state, resp) {
    state[resp.type] = state[resp.type].filter(x => x.id !== resp.id);
  },
  updateTags(state, resp) {
    state[resp.type] = state[resp.type].map(x => {
      if (x.pk === resp.pk) {
        return { ...x, ...resp };
      }
      return x;
    })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
