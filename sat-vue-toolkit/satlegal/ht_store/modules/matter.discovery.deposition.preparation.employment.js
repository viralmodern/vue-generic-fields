import api from "../../api/matter.discovery.deposition.preparation.employment";
const state = {
  dataEmployment: [],
  isLoadingGet: false,
  totals: 0,
};

const getters = {
  dataEmployment: state => state.dataEmployment,
  isLoadingGet: state => state.isLoadingGet,
  totals: state => state.totals,
};

const actions = {
  async getDataEmploymentRequest({ commit }, data = {}) {
    commit("setLoading", true);
    const result = await api.getDataEmployment(data);
    commit("getDataEmployment", result);
    commit("setLoading", false);
    return result;
  },
  async updateEmploymentRequest({ commit }, data) {
    const result = api.updateDataEmployment(data);
    commit("updateEmployment", {
      id: data.idParams.employmentId,
      body: data.body
    });
    return result;
  },
  async addEmploymentRequest({ commit }, data) {
    const result = await api.addDataEmployment(data);
    commit("addEmployment", result);
    return result;
  },
  async removeEmploymentRequest({ commit }, data) {
    const result = await api.removeEmployment(data);
    commit("removeEmployment", data.employmentId);
    return result;
  }
};

const mutations = {
  getDataEmployment(state, data) {
    state.dataEmployment = data.results;
    state.totals = data.count;
  },
  updateEmployment(state, data) {
    state.dataEmployment = state.dataEmployment.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data.body };
      }
      return x;
    });
  },
  addEmployment(state, data) {
    state.dataEmployment.push(data);
  },
  removeEmployment(state, id) {
    state.dataEmployment = state.dataEmployment.filter(
      x => x.id !== id
    );
  },
  setLoading(state, status) {
    state.isLoadingGet = status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
