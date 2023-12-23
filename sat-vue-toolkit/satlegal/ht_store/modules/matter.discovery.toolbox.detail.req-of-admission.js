import api from "../../api/matter.discovery.toolbox.detail.req-of-admission";

const state = {
  dataAdmission: [],
  totals: 0
};
const getters = {
  dataAdmission: state => state.dataAdmission,
  totals: state => state.totals
};

const actions = {
  async getDataAdmissionRequest({ commit }, data) {
    const result = await api.getDataAdmission(data);
    commit("getDataAdmission", result);
    return result;
  },
  async addAdmissionRequest({ commit }, data) {
    const result = await api.addAdmission(data);
    commit("addAdmission", result);
    return result;
  },
  async updateAdmissionRequest({ commit }, data) {
    api.updateAdmission(data);
    commit("updateAdmission", {
      id: data.idParams.admissionId,
      ...data.body
    });
  },
  async removeAdmissionRequest({ commit }, data) {
    api.removeAdmission(data);
    commit("removeAdmission", data.admissionId);
  }
};

const mutations = {
  getDataAdmission(state, {results, count}) {
    state.dataAdmission = results;
    state.totals = count;
  },
  addAdmission(state, data) {
    state.dataAdmission.unshift(data);
    state.totals++;
  },
  updateAdmission(state, data) {
    state.dataAdmission = state.dataAdmission.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeAdmission(state, id) {
    state.dataAdmission = state.dataAdmission.filter(x => x.id !== id);
    state.totals--;
  },
  cleanUpPageData(state) {
    state.dataAdmission = [];
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
