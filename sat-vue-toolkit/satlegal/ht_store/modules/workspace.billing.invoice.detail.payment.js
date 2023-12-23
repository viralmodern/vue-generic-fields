import api from "../../api/billing.invoice.detail.payment";
const state = {
  dataPayments: []
};
const getters = {
  dataPayments: state => state.dataPayments
};

const actions = {
  async getDataInvoicePaymentRequest({ commit }) {
    commit("getDataInvoicePayment", await api.getdataPayment());
  },
  async updateInvoicePaymentRequest({ commit }, data) {
    commit("updateInvoicePayment", await api.updatePayment(data));
  },
  async deletePaymentRequest({ commit }, data) {
    commit("deletePayment", data);
  },
  async addNotePaymentRequest({ commit }, data) {
    commit("addNotePayment", data);
  },
  async addPaymentRequest({ commit }, data) {
    commit("addPayment", await api.addPayment(data));
  }
};

const mutations = {
  getDataInvoicePayment(state, data) {
    state.dataPayments = data;
  },
  updateInvoicePayment(state, data) {
    const item = state.dataPayments.find(x => x.id === data.parentId);
    item[data.column] = data.value
  },
  deletePayment(state, id) {
    state.dataPayments = state.dataPayments.filter(x => x.id !== id);
  },
  addNotePayment(state, data) {
    const item = state.dataPayments.find(x =>x.id === data.parentId);
    item.note.push(data.id)
  },
  addPayment(state, data) {
    state.dataPayments.unshift(data)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
