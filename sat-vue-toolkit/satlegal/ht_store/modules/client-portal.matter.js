import api from "../../api/matter";
import discussionMessage from "./client-portal.matter.discussion-message";
import discussionDocument from "./client-portal.matter.discussion-document";
import billingExpense from "./client-portal.matter.billing-expense";
import billingInvoice from "./client-portal.matter.billing-invoice";
import billingPayment from "./client-portal.matter.billing-payment";
import casebrief from "./client-portal.matter.casebrief";

const state = {
  dataMatter: [],
  filterMatter: {}
};

const getters = {
  dataMatter: state => {
    const filter = Object.keys(state.filterMatter);
    if (filter.length > 0) {
      let dataMatter = state.dataMatter.slice();
      let { filterMatter } = state;
      filter.forEach(key => {
        if (Array.isArray(filterMatter[key])) {
          dataMatter = dataMatter.filter(x =>
            filterMatter[key].includes(x[key])
          );
        } else {
          if (key === "title") {
            dataMatter = dataMatter.filter(x => {
              return (
                x[key]
                  .toLowerCase()
                  .indexOf(filterMatter[key].toLowerCase()) !== -1
              );
            });
            return;
          }
          dataMatter = dataMatter.filter(x => x[key] === filterMatter[key]);
        }
      });
      return dataMatter;
    }
    return state.dataMatter;
  },
  hasFilter() {
    return Object.keys(state.filterMatter).length > 0;
  }
};

const actions = {
  async getDataMatterRequest({ commit }) {
    commit("getDataMatter", await api.getDataMatter());
  },
  async addDataMatterRequest({ commit }, data) {
    const result = await api.addDataMatter(data);
    commit("addDataMatter", result);
    return result;
  },
  filterMatterRequest({ commit }, filter) {
    commit("filterMatter", filter);
  }
};

const mutations = {
  getDataMatter(state, data) {
    state.dataMatter = data;
  },
  addDataMatter(state, data) {
    data.id = state.dataMatter.length + 1;
    state.dataMatter.unshift(data);
  },
  filterMatter(state, { name, value }) {
    state.filterMatter = JSON.parse(
      JSON.stringify({ ...state.filterMatter, [name]: value })
    );
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    discussionMessage,
    discussionDocument,
    billingExpense,
    billingInvoice,
    billingPayment,
    casebrief
  }
};
