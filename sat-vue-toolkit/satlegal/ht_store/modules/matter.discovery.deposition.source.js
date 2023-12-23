import api from "../../api/matter.discovery.deposition.source";

const state = {
  dataSource: []
};

const getters = {
  dataSource: state => state.dataSource
};

const actions = {
  async getDataSourceRequest({ commit }, data = {}) {
    const result = await api.getDataSource(data);
    commit("getDataSource", result);
    return result;
  },
  async addSourceRequest({ commit }, data = {}) {
    const result = await api.addSource(data);
    commit("addSource", result);
  },
  async updateSourceRequest({ commit }, data = {}) {
    const result = await api.updateSource(data);
    commit("updateSource", result);
  },
  async removeSourceRequest({ commit }, data = {}) {
    api.removeSource(data);
    commit("removeSource", data.sourceId);
  }
};

const mutations = {
  getDataSource(state, data) {
    state.dataSource = data;
  },
  addSource(state, data) {
    state.dataSource = [...state.dataSource, data];
  },
  updateSource(state, data) {
    state.dataSource = state.dataSource.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeSource(state, id) {
    state.dataSource = state.dataSource.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
