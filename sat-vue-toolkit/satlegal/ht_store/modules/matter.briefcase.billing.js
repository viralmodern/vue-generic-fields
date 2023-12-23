import chart from "./matter.briefcase.billing.chart";
import payment from "./matter.briefcase.billing.payment";
import invoice from "./matter.briefcase.billing.invoice";
import expense from "./matter.briefcase.billing.expense"


const state = {};
const getters = {};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    chart,
    payment,
    invoice,
    expense
  }
};
