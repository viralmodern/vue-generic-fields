import api from "../../api/matter.briefcase.youdesk"
const state = {
  dataYourDesk: [],
  loading: false
};
const getters = {
  dataYourDesk: state => state.dataYourDesk,
  loading: state => state.loading
};

const actions = {
  async getDataYourDeskRequest({ commit }) {
    commit("setLoading", true);
    commit("getDataYourDeskSuccess", await api.getDataYourDesk());
    commit("setLoading", false);
  },
};

const mutations = {
  getDataYourDeskSuccess(state, data) {
    state.dataYourDesk = data
  },
  setLoading(state, status) {
    state.loading = status;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
