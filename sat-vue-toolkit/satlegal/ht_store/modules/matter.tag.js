import api from "../../api/matter.tag";

const state = {
  dataTag: []
};

const getters = {
  dataTag: state => state.dataTag
};

const actions = {
  async getDataTagRequest({ commit }, data = {}) {
    const result = await await api.getDataTag(data);
    commit("getDataTag", result);
    return result;
  },
  async addTagRequest({ commit }, data = {}) {
    const result = await api.addTag(data);
    commit("addTag", result)
  },
  async updateTagRequest({ commit }, data = {}) {
    const result = await api.updateTag(data);
    commit("updateTag", result)
  },
  async removeTagRequest({ commit }, data = {}) {
    api.removeTag(data);
    commit("removeTag", data.id)
  },
};

const mutations = {
  getDataTag(state, data) {
    state.dataTag = data;
  },
  addTag(state, data) {
    state.dataTag = [...state.dataTag, data]
  },
  updateTag(state, data) {
    state.dataTag = state.dataTag.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeTag(state, id) {
    state.dataTag = state.dataTag.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
