import api from "../../api/workspace.billing.invoice.builder.invoiceAmount";

const state = {
  dataInvoiceAmount: {}
};
const getters = {
  dataInvoiceAmount: state => state.dataInvoiceAmount
};

const actions = {
  async getDataInvoiceAmountRequest({ commit }) {
    const result = await api.getDataInvoiceAmount();
    commit("getDataInvoiceAmount", result);
    return result;
  },
  async addInvoiceAmountRequest({ commit }, data) {
    const result = await api.addInvoiceAmount(data);
    commit("addInvoiceAmount", result);
    return result;
  },
  async updateInvoiceAmountRequest({ commit }, data) {
    const result = await api.updateInvoiceAmount(data);
    commit("updateInvoiceAmount", result);
    return result;
  },
  async removeInvoiceAmountRequest({ commit }, id) {
    const result = await api.removeInvoiceAmount(id);
    commit("removeInvoiceAmount", result);
    return result;
  }
};

const mutations = {
  getDataInvoiceAmount(state, data) {
    state.dataInvoiceAmount = data;
  },
  addInvoiceAmount(state, data) {
    data.id = Math.random();
    state.dataInvoiceAmount.unshift(data);
  },
  updateInvoiceAmount(state, data) {
    state.dataInvoiceAmount = state.dataInvoiceAmount.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeInvoiceAmount(state, id) {
    state.dataInvoiceAmount = state.dataInvoiceAmount.filter(x => x.id !== id);
  },
  cleanUpPageData(state) {
    state.dataInvoiceAmount = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
