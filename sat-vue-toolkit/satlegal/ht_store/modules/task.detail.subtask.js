import api from "../../api/task.detail";

const state = {
  dataSubTask: []
};

const getters = {
  dataSubTask: state => state.dataSubTask
};

const actions = {
  async getDataSubTaskRequest({ commit }) {
    commit("getDataSubTask", await api.getSubTask());
  }
};

const mutations = {
  getDataSubTask(state, dataSubTask) {
    state.dataSubTask = dataSubTask;
  },
  deleteItemSubTask(state, id){
    state.dataSubTask = state.dataSubTask.filter(x => x.id !== id);
  },
  addItemSubTask(state, data){
    state.dataSubTask.push({
      id: state.dataSubTask.length +1,
      ...data
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
