import api from "../../api/client-portal.inbox";
import detail from "./client-portal.inbox.detail";
import {$$STORE_PREFIX} from "../../utils";

const state = {
  dataInbox: []
};
const getters = {
  dataInbox: (state, _, __, rootGetters) => {
    const dataClient = rootGetters["ht_store/workspace/client/dataClient"];
    const map = (state.dataInbox || []).map(item => {
      item.from = dataClient.find(x => x.id === item.fromId) || {};
      return item;
    });
    return map;
  }
};

const actions = {
  async getDataInboxRequest({ commit }) {
    const result = await api.getDataInbox();
    commit("getDataInbox", result);
    return result;
  },
  async addDataInboxRequest({ commit }, data) {
    const result = await api.addDataInbox(data);
    commit("addDataInbox", result);
    return result;
  },
  async updateDataInboxRequest({ commit }, data) {
    const result = await api.updateDataInbox(data);
    commit("updateDataInbox", result);
    return result;
  },
  async deleteDataInboxRequest({ commit }, listId) {
    const result = await api.deleteDataInbox(listId);
    commit("deleteDataInbox", result);
    return result;
  }
};

const mutations = {
  getDataInbox(state, data) {
    state.dataInbox = data;
  },
  addDataInbox(state, data) {
    state.dataInbox = [...data, ...state.dataInbox];
  },
  updateDataInbox(state, data) {
    state.dataInbox = state.dataInbox.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  deleteDataInbox(state, listId) {
    state.dataInbox = state.dataInbox.filter(x => !listId.includes(x.id));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    detail
  }
};
