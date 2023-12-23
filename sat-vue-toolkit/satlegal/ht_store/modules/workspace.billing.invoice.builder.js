import api from "../../api/workspace.billing.invoice.builder";
import invoiceAmount from "./workspace.billing.invoice.builder.invoiceAmount";
import expenses from "./workspace.billing.invoice.builder.expenses";
import timeEntries from "./workspace.billing.invoice.builder.timeEntries";

const state = {
  dataInvoiceBuilder: {}
};
const getters = {
  dataInvoiceBuilder: state => state.dataInvoiceBuilder
};

const actions = {
  async getDataInvoiceBuilderRequest({ commit }) {
    const result = await api.getDataInvoiceBuilder();
    commit("getDataInvoiceBuilder", result);
    return result;
  },
  async updateDataInvoiceBuilderRequest({ commit }, data) {
    const result = await api.updateDataInvoiceBuilder(data);
    commit("updateDataInvoiceBuilder", result);
    return result;
  }
};

const mutations = {
  getDataInvoiceBuilder(state, data) {
    state.dataInvoiceBuilder = data;
  },
  updateDataInvoiceBuilder(state, data) {
    state.dataInvoiceBuilder = { ...state.dataInvoiceBuilder, ...data };
  },
  cleanUpPageData(state) {
    state.dataInvoiceBuilder = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    invoiceAmount,
    expenses,
    timeEntries
  }
};
