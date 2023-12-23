import api from "../../api/client-portal.inbox.detail";

const state = {
  dataInboxDetail: {}
};
const getters = {
  dataInboxDetail: (state, _, __, rootGetters) => {
    const dataClient = rootGetters["workspace/client/dataClient"];
    const map = {
      ...state.dataInboxDetail,
      from: dataClient.find(x => x.id === state.dataInboxDetail.fromId) || {}
    };
    return map;
  }
};

const actions = {
  async getDataInboxDetailRequest({ commit }, id) {
    const result = await api.getDataInboxDetail(id);
    commit("getDataInboxDetail", result);
    return result;
  },
  async addDataInboxDetailRequest({ commit }, data) {
    const result = await api.addDataInboxDetail(data);
    commit("addDataInboxDetail", result);
    return result;
  },
  async updateDataInboxDetailRequest({ commit }, data) {
    const result = await api.updateDataInboxDetail(data);
    commit("updateDataInboxDetail", result);
    return result;
  }
};

const mutations = {
  getDataInboxDetail(state, data) {
    state.dataInboxDetail = data;
  },
  addDataInboxDetail(state, data) {
    state.dataInboxDetail.unshift(data);
  },
  updateDataInboxDetail(state, data) {
    state.dataInboxDetail = { ...state.dataInboxDetail, ...data };
  },
  cleanUpPageData(state) {
    state.dataInboxDetail = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
