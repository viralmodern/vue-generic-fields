import api from "../../api/matter.members";

const state = {
  dataMatterMembers: []
};
const getters = {
  dataMatterMembers: state => state.dataMatterMembers
};

const actions = {
  async getDataMatterMembersRequest({ commit }) {
    const result = await api.getDataMatterMembers();
    commit("getDataMatterMembers", result);
    return result;
  }
};

const mutations = {
  getDataMatterMembers(state, data) {
    state.dataMatterMembers = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
