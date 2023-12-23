import api from "../../api/project.overview";
const state = {
  claims: []
};

const getters = {
  claims: state => state.claims
};

const actions = {
  async getDataOverviewClaimRequest({ commit }, id) {
    commit("getDataOverviewClaim", await api.listOverviewClaim(id));
  }
};

const mutations = {
  getDataOverviewClaim(state, data) {
    state.claims = data;
  },
  changeDragDrawClaim(state, data) {
    state.claims = data;
  },
  changeDataClaim(state, data) {
    switch (data.nameRow) {
      case "countName":
        state.claims.find(x => x.id === data.id).countName == data.value;
        break;
      case "description":
        state.claims.find(x => x.id === data.id).description == data.value;
        break;
      case "tags":
        state.claims.find(x => x.id === data.id).tags == data.value;
        break;
      case "records":
        state.claims.find(x => x.id === data.id).records == data.value;
        break;
      default:
        break;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
