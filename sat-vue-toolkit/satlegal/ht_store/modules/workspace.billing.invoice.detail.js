import api from "../../api/billing.invoice.detail";
import payment from "./workspace.billing.invoice.detail.payment"
import note from "./workspace.billing.invoice.detail.note"
const state = {
  invoiceDetail: []
};
const getters = {
  invoiceDetail: state => state.invoiceDetail
};

const actions = {
  async getDataInvoiceDetailRequest({ commit }) {
    commit("getDataInvoiceDetail", await api.getInvoiceDetail());
  },
  async updateInvoiceDetailRequest({ commit }, data) {
    commit("updateInvoiceDetail", data);
  }
};

const mutations = {
  getDataInvoiceDetail(state, data) {
    state.invoiceDetail = data;
  },
  updateInvoiceDetail(state, data) {
    state.invoiceDetail[data.column] = data.value
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    payment,
    note
  }
};
