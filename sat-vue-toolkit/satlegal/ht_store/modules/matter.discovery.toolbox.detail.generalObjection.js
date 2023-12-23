import api from "../../api/matter.discovery.toolbox.detail.generalObjection";

const state = {
  dataGeneralObjection: [],
  totals: 0
};
const getters = {
  dataGeneralObjection: state => state.dataGeneralObjection,
  totals: state => state.totals,
};

const actions = {
  async getDataGeneralObjectionRequest({ commit }, data) {
    const result = await api.getDataGeneralObjection(data);
    commit("getDataGeneralObjection", result);
    return result;
  },
  async addGeneralObjectionRequest({ commit }, data) {
    const result = await api.addGeneralObjection(data);
    commit("addGeneralObjection", result);
    return result;
  },
  async updateGeneralObjectionRequest({ commit }, data) {
    api.updateGeneralObjection(data);
    commit("updateGeneralObjection", {
      id: data.idParams.generalObjectId,
      ...data.body
    });
  },
  async removeGeneralObjectionRequest({ commit }, data) {
    api.removeGeneralObjection(data);
    commit("removeGeneralObjection", data.generalObjectId);
  }
};

const mutations = {
  getDataGeneralObjection(state, { results, count }) {
    state.dataGeneralObjection = results;
    state.totals = count;
  },
  addGeneralObjection(state, data) {
    state.dataGeneralObjection.unshift(data);
    state.totals++;
  },
  updateGeneralObjection(state, data) {
    state.dataGeneralObjection = state.dataGeneralObjection.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeGeneralObjection(state, id) {
    state.dataGeneralObjection = state.dataGeneralObjection.filter(x => x.id !== id);
    state.totals--;
  },
  cleanUpPageData(state) {
    state.dataGeneralObjection = [];
    state.totals = 0;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
