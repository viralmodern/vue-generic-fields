import api from "../../api/workspace.billing.invoice.builder.timeEntries";

const state = {
  dataInvoiceTimeEntries: []
};
const getters = {
  dataInvoiceTimeEntries: state => state.dataInvoiceTimeEntries
};

const actions = {
  async getDataInvoiceTimeEntriesRequest({ commit }) {
    const result = await api.getDataInvoiceTimeEntries();
    commit("getDataInvoiceTimeEntries", result);
    return result;
  },
  async addInvoiceTimeEntriesRequest({ commit }, data) {
    const result = await api.addInvoiceTimeEntries(data);
    commit("addInvoiceTimeEntries", result);
    return result;
  },
  async updateInvoiceTimeEntriesRequest({ commit }, data) {
    const result = await api.updateInvoiceTimeEntries(data);
    commit("updateInvoiceTimeEntries", result);
    return result;
  },
  async removeInvoiceTimeEntriesRequest({ commit }, id) {
    const result = await api.removeInvoiceTimeEntries(id);
    commit("removeInvoiceTimeEntries", result);
    return result;
  }
};

const mutations = {
  getDataInvoiceTimeEntries(state, data) {
    state.dataInvoiceTimeEntries = data;
  },
  addInvoiceTimeEntries(state, data) {
    data.id = Math.random();
    state.dataInvoiceTimeEntries.unshift(data);
  },
  updateInvoiceTimeEntries(state, data) {
    state.dataInvoiceTimeEntries = state.dataInvoiceTimeEntries.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeInvoiceTimeEntries(state, id) {
    state.dataInvoiceTimeEntries = state.dataInvoiceTimeEntries.filter(x => x.id !== id);
  },
  cleanUpPageData(state) {
    state.dataInvoiceTimeEntries = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
