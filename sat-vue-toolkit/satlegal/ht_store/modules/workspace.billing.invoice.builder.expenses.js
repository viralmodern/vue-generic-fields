import api from "../../api/workspace.billing.invoice.builder.expenses";

const state = {
  dataInvoiceExpenses: []
};
const getters = {
  dataInvoiceExpenses: state => state.dataInvoiceExpenses
};

const actions = {
  async getDataInvoiceExpensesRequest({ commit }) {
    const result = await api.getDataInvoiceExpenses();
    commit("getDataInvoiceExpenses", result);
    return result;
  },
  async addInvoiceExpensesRequest({ commit }, data) {
    const result = await api.addInvoiceExpenses(data);
    commit("addInvoiceExpenses", result);
    return result;
  },
  async updateInvoiceExpensesRequest({ commit }, data) {
    const result = await api.updateInvoiceExpenses(data);
    commit("updateInvoiceExpenses", result);
    return result;
  },
  async removeInvoiceExpensesRequest({ commit }, id) {
    const result = await api.removeInvoiceExpenses(id);
    commit("removeInvoiceExpenses", result);
    return result;
  }
};

const mutations = {
  getDataInvoiceExpenses(state, data) {
    state.dataInvoiceExpenses = data;
  },
  addInvoiceExpenses(state, data) {
    data.id = Math.random();
    state.dataInvoiceExpenses.unshift(data);
  },
  updateInvoiceExpenses(state, data) {
    state.dataInvoiceExpenses = state.dataInvoiceExpenses.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeInvoiceExpenses(state, id) {
    state.dataInvoiceExpenses = state.dataInvoiceExpenses.filter(x => x.id !== id);
  },
  cleanUpPageData(state) {
    state.dataInvoiceExpenses = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
