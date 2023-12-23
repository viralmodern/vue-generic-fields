import api from "../../api/workspace.client.detail.billing";
import chart from "./workspace.client.detail.billing.chart";

const state = {
  dataInvoice: []
};
const getters = {
  dataInvoice: state => state.dataInvoice
};

const actions = {
  async getDataInvoiceRequest({ commit }) {
    const result = await api.getDataInvoice();
    commit("getDataInvoice", result);
    return result;
  },
  async addDataInvoiceRequest({ commit }, data) {
    const body = {
      id: Math.random(),
      status: 1,
      created: new Date().toISOString(),
      client: 1,
      payments: 0,
      lastPayment: null,
      fulfillment: 1,
      amount: 0,
      balance: 0,
      ...data
    };
    const result = await api.addDataInvoice(body);
    commit("addDataInvoice", result);
    return result;
  },
  async updateDataInvoiceRequest({ commit }, data) {
    const result = await api.updateDataInvoice(data);
    commit("updateDataInvoice", result);
    return result;
  },
  async deleteDataInvoiceRequest({ commit }, id) {
    const result = await api.deleteDataInvoice(id);
    commit("deleteDataInvoice", result);
    return result;
  },
  filterInvoiceRequest({ commit }, filter) {
    commit("filterInvoice", filter);
  }
};

const mutations = {
  getDataInvoice(state, data) {
    state.dataInvoice = data;
  },
  addDataInvoice(state, data) {
    state.dataInvoice.unshift(data);
  },
  updateDataInvoice(state, data) {
    state.dataInvoice = state.dataInvoice.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  deleteDataInvoice(state, id) {
    state.dataInvoice = state.dataInvoice.filter(x => x.id !== id);
  },
  filterInvoice(state, { name, value }) {
    state.filterInvoice = JSON.parse(
      JSON.stringify({ ...state.filterInvoice, [name]: value })
    );
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    chart
  }
};
