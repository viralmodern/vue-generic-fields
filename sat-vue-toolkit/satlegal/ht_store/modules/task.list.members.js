import api from "../../api/task.list";

const state = {
  dataMembers: []
};

const getters = {
  dataMembers: state => state.dataMembers
};

const actions = {
  async getDataMembersRequest({ commit }) {
    commit("getDataMembers", await api.getDataMemberTask());
  }
};

const mutations = {
  getDataMembers(state, dataMembers) {
    state.dataMembers = dataMembers;
  },
  selectMember(state, objectMemeber) {
    const { isActive, id } = objectMemeber.newValue;
    state.dataMembers = state.dataMembers.map(e => {
      if (e.id === id) {
        return { ...e, isActive };
      }
      return e;
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
