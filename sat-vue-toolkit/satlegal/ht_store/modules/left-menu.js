import {dataLeftMenu} from "../../mock-data/left-menu";

const state = {
  dataLeftMenu: {},
  loading: false
};

const getters = {
  dataLeftMenu: state => state.dataLeftMenu,
  loading: state => state.loading
};

const actions = {
  async getdataLeftMenu({ commit }) {
    commit("loadingSuccess", true);
    setTimeout(() => {
      commit("getdataLeftMenuSuccess", dataLeftMenu);
      commit("loadingSuccess", false);
    }, 1500);
  }
};

const mutations = {
  getdataLeftMenuSuccess(state, dataLeftMenu) {
    state.dataLeftMenu = dataLeftMenu;
  },
  loadingSuccess(state, loading) {
    state.loading = loading;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
