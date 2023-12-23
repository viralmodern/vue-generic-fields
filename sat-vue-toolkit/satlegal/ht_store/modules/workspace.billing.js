import invoice from "./workspace.billing.invoice";
import expense from "./workspace.billing.expense";
import payment from "./workspace.billing.payment";
import setting from "./workspace.billing.setting";
import summary from "./workspace.billing.summary";

const state = {
  billings: []
};
const getters = {
  billings: state => state.billings
};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    invoice,
    expense,
    payment,
    setting,
    summary
  }
};
