import api from "../../api/setting";

const state = {
  dataBilling: {},
  loading: false,
  listCurrency: []
};

const getters = {
  dataBilling: state => state.dataBilling,
  loading: state => state.loading,
  listCurrency: state => state.listCurrency
};

const actions = {
  async getDataBillingRequest({ commit }) {
    commit("getDataBillingSuccess", await api.getDataBilling());
  },
  async removeCreditCard({ commit }, data) {
    commit("removeCreditCardSuccess", await api.deleteCreditCard(data));
  },
  async removeCardPayment({ commit }, data) {
    commit("removeCardPaymentSuccess", await api.deleteCardPayment(data));
  },
  async changeAvatar({ commit }, data) {
    commit("changeAvatarSuccess", await api.postChangeAvatar(data));
  },
  async removeCreditCardDebit({ commit }, data) {
    commit(
      "removeCreditCardDebitSuccess",
      await api.postDeleteCreditCard(data)
    );
  },
  async getListCurrencyRequest({ commit }) {
    commit("getListCurrencySuccess", await api.getDataListCurrency());
  },
  async createPayment({ commit }, data) {
    commit("createPaymentSuccess", await api.postCreatePayment(data));
  }
};

const mutations = {
  getDataBillingSuccess(state, dataBilling) {
    state.dataBilling = dataBilling;
  },
  removeCreditCardSuccess(state, data) {
    state.dataBilling.CreditOrDebitCards = state.dataBilling.CreditOrDebitCards.filter(
      x => x.id !== data.id
    );
  },
  removeCardPaymentSuccess(state, data) {
    state.dataBilling.paymentHistory = state.dataBilling.paymentHistory.filter(
      x => x.id !== data.id
    );
  },
  changeAvatarSuccess(state, data) {
    state.dataBilling.user.imageUrl = data;
  },
  removeCreditCardDebitSuccess(state, data) {
    state.dataBilling.dataCreditCard = state.dataBilling.dataCreditCard.filter(
      x => x.id !== data.id
    );
  },
  getListCurrencySuccess(state, listCurrency) {
    state.listCurrency = listCurrency;
  },
  createPaymentSuccess(state, data) {
    return {
      state,
      data
    };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
