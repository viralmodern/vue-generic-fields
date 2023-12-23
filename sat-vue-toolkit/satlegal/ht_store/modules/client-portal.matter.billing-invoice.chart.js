import api from "../../api/client-portal.matter.billing-invoice.chart";
import {$$STORE_PREFIX} from "../../utils";

const state = {
  dataChartOfSummary: []
};

const getters = {
  dataChartOfSummary: (state, rootState, getters, rootGetters) => {
    var dataClient = rootGetters["ht_store/workspace/client/dataClient"];
    let resultClient = [];
    dataClient.forEach((obj, i) => {
      resultClient.push(Object.assign({}, obj, state.dataChartOfSummary[i]));
    });
    return resultClient;
  }
};

const actions = {
  async getDataChartSummary({ commit }) {
    commit("getDataChartSummary", await api.getDataChartSummary())
  }
};

const mutations = {
  getDataChartSummary(state, dataChartOfSummary) {
    state.dataChartOfSummary = dataChartOfSummary
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
