import api from "../../api/matter.discovery.deposition.detail.deponent";

const state = {
  dataDeponentDetail: {}
};
const getters = {
  dataDeponentDetail: state => state.dataDeponentDetail
};

const actions = {
  async getDataDeponentDetailRequest({ commit }, data) {
    const result = await api.getDataDeponentDetail(data);
    commit("getDataDeponentDetail", result);
    return result;
  },
  async editDataDeponentDetailRequest({ commit }, data) {
    // const result = await api.editDataDeponentDetail(data);
    commit("editDataDeponentDetail", data);
  },
};

const mutations = {
  getDataDeponentDetail(state, data) {
    state.dataDeponentDetail = data;
  },
  editDataDeponentDetail(state, data) {

    state.dataDeponentDetail[data.column] = data.value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
