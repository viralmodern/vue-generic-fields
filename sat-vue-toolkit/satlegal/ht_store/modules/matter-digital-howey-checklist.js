import api from "../../api/matter-digital-howey-checklist";
import condition from "./matter-digital-howey-checklist-condition"
const state = {
  dataDigitalHowey: [],
  dataResultGroup: {},
  dataStatusGroup: {}
}

const getters = {
  dataDigitalHowey: state => state.dataDigitalHowey,
  dataResultGroup: state => {
    const data = {};
    (state.dataDigitalHowey || []).forEach(e =>
      (data[e.results] = data[e.results] || []).push(e)
    );
    return data;
  },
  dataStatusGroup: state => {
    const data = {};
    (state.dataDigitalHowey || []).forEach(e =>
      (data[e.status] = data[e.status] || []).push(e)
    );
    return data;
  }
}

const actions = {
  async getDataDigitalHowey({ commit }) {
    commit("getDataDigitalHowey", await api.getDataDigitalHowey())
  },
  async updateTask({ commit }, data) {
    commit("updateTask", data)
  }
}

const mutations = {
  getDataDigitalHowey(state, results) {
    state.dataDigitalHowey = results
  },
  updateTask(state, data) {
    const task = state.dataDigitalHowey.find(x => x.id === data.taskId);
    switch (data.columnName) {
      case "name":
        task.name = data.newValue;
        break;
      case "howey":
        task.howeyCon = data.newValue;
        break;
      case "status":
        task.status = data.newValue.id;
        break;
      case "result":
        task.results = data.newValue.id;
        break;
      case "actions":
        state.dataDigitalHowey = state.dataDigitalHowey.map(x => {
          if (x.id === data.taskId) {
            return { ...x, isStrike: !x.isStrike }
          }
          return x;
        })
        break;
    }
    return task;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules: {
    condition
  }
}
