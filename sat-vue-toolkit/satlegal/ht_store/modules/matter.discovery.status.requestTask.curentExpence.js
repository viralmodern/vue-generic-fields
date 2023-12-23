import api from "../../api/matter.discovery.status.requestTask.curentExpence";

const state = {
  dataCurentExpense: []
};

const getters = {
  dataCurentExpense: state => state.dataCurentExpense
};

const actions = {
  async getDataCurentExpense({ commit }) {
    commit("getDataCurentExpense", await api.getDataCurentExpense());
  },
  async addCurentExpense({ commit }, data) {
    commit("addCurentExpense", await api.addCurentExpense(data));
  },
  async updateCurentExpense({ commit }, data) {
    commit("updateCurentExpense", data, await api.updateCurentExpense(data));
  },
  async removeCurentExpense({ commit }, data) {
    commit("removeCurentExpense", await api.removeCurentExpense(data));
  }
};

const mutations = {
  getDataCurentExpense(state, dataCurentExpense) {
    state.dataCurentExpense = dataCurentExpense;
  },
  addCurentExpense(state, data) {
    state.dataCurentExpense = [...state.dataCurentExpense, data];
  },
  updateCurentExpense(state, data) {
    var item = state.dataCurentExpense.find(x => x.id === data.id);
    item[data.columnName] = data.value;
  },
  removeCurentExpense(state, data) {
    state.dataCurentExpense = state.dataCurentExpense.filter(x => x.id !== data.id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
