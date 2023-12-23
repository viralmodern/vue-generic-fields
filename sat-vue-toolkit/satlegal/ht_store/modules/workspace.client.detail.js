import api from "../../api/workspace.client.detail";
import message from "./workspace.client.detail.message";
import billing from "./workspace.client.detail.billing";
import document from "./workspace.client.detail.document";
import addressbook from "./workspace.client.detail.addressbook";
import meeting from "./workspace.client.detail.meeting";
import note from "./workspace.client.detail.note";
import overview from "./workspace.client.detail.overview";

const state = {
  clientDetail: {}
};
const getters = {
  clientDetail: state => state.clientDetail
};

const actions = {
  async getDataClientDetailRequest({ commit }) {
    commit("getDataClientDetail", await api.getDataClientDetail());
  },
  async updateAvatar({ commit }, url) {
    commit("updateAvatar", url, await api.updateAvatar());
  },
  changeDescription({ commit }, data) {
    commit("changeDescription", data, api.changeDescription());
  },
  changeSignedRequest({ commit }, data) {
    commit("changeSigned", data);
  },
  changeAccountTypeRequest({ commit }, data) {
    commit("changeAccountType", data);
  }
};

const mutations = {
  getDataClientDetail(state, data) {
    state.clientDetail = data;
  },
  updateAvatar(state, url) {
    state.clientDetail.avatar = url;
  },
  changeDescription(state, data) {
    state.clientDetail.description = data;
  },
  changeSigned(state, data) {
    state.clientDetail.signed = data;
  },
  changeAccountType(state, data) {
    state.clientDetail.account_type = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    message,
    document,
    addressbook,
    billing,
    meeting,
    note,
    overview
  }
};
