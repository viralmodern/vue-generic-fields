import api from "../../api/project.overview";
const state = {
  complaints: []
};

const getters = {
  complaints: state => state.complaints
};

const actions = {
  async getDataOverviewComplaintRequest({ commit }, id) {
    commit("getDataOverviewComplaint", await api.listOverviewComplaint(id));
  }
};

const mutations = {
  getDataOverviewComplaint(state, data) {
    state.complaints = data;
  },
  changeDragDrawComplaint(state, data) {
    state.complaints = data;
  },
  changeDataComplaint(state, data) {
    switch (data.nameRow) {
      case "plantiff":
        state.complaints.find(x => x.id === data.id).plantiff == data.value;
        break;
      case "responses":
        state.complaints.find(x => x.id === data.id).responses == data.value;
        break;
      case "tags":
        state.complaints.find(x => x.id === data.id).tags == data.value;
        break;
      case "records":
        state.complaints.find(x => x.id === data.id).records == data.value;
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
