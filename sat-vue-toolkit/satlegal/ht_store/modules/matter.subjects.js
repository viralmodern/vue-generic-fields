import api from "../../api/matter.subjects";

const state = {
  dataSubjects: []
};

const getters = {
  dataSubjects: state => state.dataSubjects
};

const actions = {
  async getDataSubjectsRequest({ commit }, data = {}) {
    commit("getDataSubjects", await api.getDataSubjects(data));
  },
  async addSubjectsRequest({ commit }, data = {}) {
    const result = await api.addSubjects(data);
    commit("addSubjects", result)
  },
  async updateSubjectsRequest({ commit }, data = {}) {
    const result = await api.updateSubjects(data);
    commit("updateSubjects", result)
  },
  async removeSubjectsRequest({ commit }, data = {}) {
    api.removeSubjects(data);
    commit("removeSubjects", data.id)
  },
};

const mutations = {
  getDataSubjects(state, data) {
    state.dataSubjects = data;
  },
  addSubjects(state, data) {
    state.dataSubjects = [...state.dataSubjects, data]
  },
  updateSubjects(state, data) {
    state.dataSubjects = state.dataSubjects.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeSubjects(state, id) {
    state.dataSubjects = state.dataSubjects.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
