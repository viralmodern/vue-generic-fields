import api from "../../api/matter.digitalHoweyChecklist.task.detail";

const state = {
  dataTaskDetail: {}
};

const getters = {
  dataTaskDetail: state => state.dataTaskDetail
};

const actions = {
  async getDataTaskDetailRequest({ commit }) {
    const result = await api.getDataTaskDetail();
    commit("getDataTaskDetail", result);
    return result;
  },
  updateTaskDetailRequest({ commit }, data) {
    api.updateTaskDetail(data);
    commit("updateTaskDetail", data);
  }
};

const mutations = {
  getDataTaskDetail(state, data) {
    state.dataTaskDetail = data;
  },
  updateTaskDetail(state, data) {
    state.dataTaskDetail = { ...state.dataTaskDetail, ...data };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
