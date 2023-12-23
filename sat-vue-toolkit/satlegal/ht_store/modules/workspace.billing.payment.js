import api from "../../api/billing.payment";
const state = {
  payment: [],
  filterPayment: {}
};
const getters = {
  payment: state => {
    const filter = Object.keys(state.filterPayment);
    let clonePayment = state.payment.slice();
    const { filterPayment } = state;
    if (filter.length > 0) {
      filter.forEach(key => {
        if (key === "paymentMethod") {
          clonePayment = clonePayment.filter(
            x => x.paymentMethod === filterPayment[key]
          );
          return;
        }
        if (key === "client") {
          clonePayment = clonePayment.filter(
            x => x.client === filterPayment[key]
          );
          return;
        }
        if (key === "paymentDate") {
          clonePayment = clonePayment.filter(
            x =>
              new Date(filterPayment[key]).toDateString() ===
              new Date(x[key]).toDateString()
          );
          return;
        }
      });
      return clonePayment;
    }
    return state.payment;
  },
  hasFilter() {
    return Object.keys(state.filterPayment).length > 0;
  }
};

const actions = {
  async getDataPaymentRequest({ commit }) {
    commit("getDataPayment", await api.getPayment());
  },
  async updatePaymentRequest({ commit }, data) {
    commit("updatePayment", await api.updatePayment(data));
  },
  async deletePaymentRequest({ commit }, data) {
    commit("deletePayment", await api.deletePayment(data));
  },
  async addPaymentRequest({ commit }, data) {
    commit("addPayment", await api.addPayment(data));
  },
  async filterPaymentRequest({ commit }, data) {
    commit("filterPayment", data);
  }
};

const mutations = {
  getDataPayment(state, data) {
    state.payment = data;
  },
  updatePayment(state, data) {
    const item = state.payment.find(x => x.id === data.parentId);
    item[data.column] = data.value;
  },
  deletePayment(state, id) {
    state.payment = state.payment.filter(x => x.id !== id);
  },
  addPayment(state, data) {
    state.payment.unshift(data);
  },
  filterPayment(state, { name, value }) {
    state.filterPayment = JSON.parse(
      JSON.stringify({ ...state.filterPayment, [name]: value })
    );
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
