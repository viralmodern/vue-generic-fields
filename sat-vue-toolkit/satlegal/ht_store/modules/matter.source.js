import api from "../../api/matter.source";

const state = {
  dataSource: []
};

const getters = {
  dataSource: state => state.dataSource
};

const actions = {
  async getDataSourceRequest({ commit }, data = {}) {
    commit("getDataSource", await api.getDataSource(data));
  },
  async addSourceRequest({ commit }, data = {}) {
    const result = await api.addSource(data);
    commit("addSource", result)
  },
  async updateSourceRequest({ commit }, data = {}) {
    const result = await api.updateSource(data);
    commit("updateSource", result)
  },
  async removeSourceRequest({ commit }, data = {}) {
    api.removeSource(data);
    commit("removeSource", data.id)
  },
};

const mutations = {
  getDataSource(state, data) {
    state.dataSource = data;
  },
  addSource(state, data) {
    state.dataSource = [...state.dataSource, data]
  },
  updateSource(state, data) {
    state.dataSource = state.dataSource.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeSource(state, id) {
    state.dataSource = state.dataSource.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
