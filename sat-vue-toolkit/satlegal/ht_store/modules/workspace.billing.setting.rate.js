import api from "../../api/billing.setting.rate";
const state = {
  rates: []
};
const getters = {
  rates: state => state.rates
};

const actions = {
  async getDataSettingRateRequest({ commit }) {
    commit("getDataSettingRate", await api.getRate());
  },
  async updateSettingRateRequest({ commit }, data) {
    commit("updateSettingRate", await api.updateSettingRate(data));
  },
  async deleteRateRequest({ commit }, data) {
    commit("deleteRate", await api.deleteRate(data));
  },
  async addRateRequest({ commit }, data) {
    commit("addRate", await api.addRate(data));
  }
};

const mutations = {
  async getDataSettingRate(state, data) {
    state.rates = data;
  },
  async addRate(state, data) {
    state.rates.unshift(data);
  },
  async deleteRate(state, id) {
    state.rates = state.rates.filter(x => x.id !== id);
  },
  async updateSettingRate(state, data) {
    let item = state.rates.find(x => x.id === data.parentId);
    item[data.column] = data.value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
