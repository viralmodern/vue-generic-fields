import api from "../../api/matter.labels";

const state = {
  dataLabels: []
};

const getters = {
  dataLabels: state => state.dataLabels
};

const actions = {
  async getDataLabelsRequest({ commit }, data = {}) {
    const result = await api.getDataLabels(data);
    commit("getDataLabels", await api.getDataLabels(data));
    return result;
  },
  async addLabelsRequest({ commit }, data = {}) {
    const result = await api.addLabels(data);
    commit("addLabels", result)
  },
  async updateLabelsRequest({ commit }, data = {}) {
    const result = await api.updateLabels(data);
    commit("updateLabels", result)
  },
  async removeLabelsRequest({ commit }, data = {}) {
    api.removeLabels(data);
    commit("removeLabels", data.id)
  },
};

const mutations = {
  getDataLabels(state, data) {
    state.dataLabels = data;
  },
  addLabels(state, data) {
    state.dataLabels = [...state.dataLabels, data]
  },
  updateLabels(state, data) {
    state.dataLabels = state.dataLabels.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeLabels(state, id) {
    state.dataLabels = state.dataLabels.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
