import api from "../../api/matter.issues";

const state = {
  dataIssues: []
};
const getters = {
  dataIssues: state => state.dataIssues
};

const actions = {
  async getDataIssuesRequest({ commit }, data = {}) {
    const result =  await api.getDataIssues(data);
    commit("getDataIssues", result);
    return result;
  },
  async addIssuesRequest({ commit }, data = {}) {
    const result = await api.addIssues(data);
    commit("addIssues", result)
  },
  async updateIssuesRequest({ commit }, data = {}) {
    const result = await api.updateIssues(data);
    commit("updateIssues", result)
  },
  async removeIssuesRequest({ commit }, data = {}) {
    api.removeIssues(data);
    commit("removeIssues", data.id)
  },
};

const mutations = {
  getDataIssues(state, data) {
    state.dataIssues = data;
  },
  addIssues(state, data) {
    state.dataIssues = [...state.dataIssues, data]
  },
  updateIssues(state, data) {
    state.dataIssues = state.dataIssues.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeIssues(state, id) {
    state.dataIssues = state.dataIssues.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
