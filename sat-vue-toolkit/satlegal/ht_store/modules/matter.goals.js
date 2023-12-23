import api from "../../api/matter.goals";

const state = {
  dataGoals: []
};

const getters = {
  dataGoals: state => state.dataGoals
};

const actions = {
  async getDataGoalsRequest({ commit }, data = {}) {
    const result = await api.getDataGoals(data)
    commit("getDataGoals", result);
    return result;
  },
  async addGoalsRequest({ commit }, data = {}) {
    const result = await api.addGoals(data);
    commit("addGoals", result)
  },
  async updateGoalsRequest({ commit }, data = {}) {
    const result = await api.updateGoals(data);
    commit("updateGoals", result)
  },
  async removeGoalsRequest({ commit }, data = {}) {
    api.removeGoals(data);
    commit("removeGoals", data.id)
  },
};

const mutations = {
  getDataGoals(state, data) {
    state.dataGoals = data;
  },
  addGoals(state, data) {
    state.dataGoals = [...state.dataGoals, data]
  },
  updateGoals(state, data) {
    state.dataGoals = state.dataGoals.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeGoals(state, id) {
    state.dataGoals = state.dataGoals.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
