import api from "../../api/matter.discovery.toolbox.detail.interrogatory";

const state = {
  dataInterrogatory: [],
  totals: 0
};
const getters = {
  dataInterrogatory: state => state.dataInterrogatory,
  totals: state => state.totals
};

const actions = {
  async getDataInterrogatoryRequest({ commit }, data) {
    const result = await api.getDataInterrogatory(data);
    commit("getDataInterrogatory", result);
    return result;
  },
  async addInterrogatoryRequest({ commit }, data) {
    const result = await api.addInterrogatory(data);
    commit("addInterrogatory", result);
    return result;
  },
  async updateInterrogatoryRequest({ commit }, data) {
    api.updateInterrogatory(data);
    commit("updateInterrogatory", {
      id: data.idParams.interrogatoryId,
      ...data.body
    });
  },
  async removeInterrogatoryRequest({ commit }, data) {
    api.removeInterrogatory(data);
    commit("removeInterrogatory", data.interrogatoryId);
  }
};

const mutations = {
  getDataInterrogatory(state, {results, count}) {
    state.dataInterrogatory = results;
    state.totals = count;
  },
  addInterrogatory(state, data) {
    state.dataInterrogatory.unshift(data);
    state.totals++;
  },
  updateInterrogatory(state, data) {
    state.dataInterrogatory = state.dataInterrogatory.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeInterrogatory(state, id) {
    state.dataInterrogatory = state.dataInterrogatory.filter(x => x.id !== id);
    state.totals--;
  },
  cleanUpPageData(state) {
    state.dataInterrogatory = [];
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
