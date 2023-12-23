import api from "../../api/task.detail";

const state = {
  dataMembers: [],
  taskDetail: {}
};

const getters = {
  taskDetail: state => state.taskDetail,
  dataMembers: state => state.dataMembers
};

const actions = {
  async getDataMembersRequest({ commit }) {
    commit("getDataMembers", await api.getDataMemberTask());
  },
  async getDataTaskDetailRequest({ commit }) {
    commit("getDataTaskDetail", await api.getDetailTask());
  }
};

const mutations = {
  getDataTaskDetail(state, taskDetail) {
    state.taskDetail = taskDetail;
  },
  getDataMembers(state, dataMembers) {
    state.dataMembers = dataMembers;
  },
  selectMember(state, data) {
    let isActive = state.taskDetail.members.some(z => z.id === data.id);
    if (isActive) {
      state.taskDetail.members = state.taskDetail.members.filter(
        x => x.id !== data.id
      );
    }
  },
  addMembers(state, data) {
    state.taskDetail.members = [...state.taskDetail.members, data];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
