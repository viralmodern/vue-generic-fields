
import api from "../../api/project.overview";
import complaint from "./project.overview.complaint"
import claim from "./project.overview.claim"
const state = {
  overview: {}
};

const getters = {
  overview: state => state.overview
};

const actions = {
  async getDataOverviewRequest({ commit }) {
    commit("getDataOverview", await api.getOverviewDetail());
  }
};

const mutations = {
  createTagItem(state, data){
    let item = state.complaints.dataComplaints.find(x => x.id === data.id);
    item.tags.push({
      id: Math.random(),
      name: data.value
    })
  },
  getDataOverview(state, data){
    state.overview = data
  },
  changeOverviewDetail(state, {name, value}){
    state.overview[name] = value
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    complaint,
    claim
  }
};
