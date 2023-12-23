import api from "../../api/matter.discovery.deposition.preparation.rendered";
import notes from "./matter.discovery.deposition.preparation.rendered.notes"
const state = {
  dataRendered: []
};

const getters = {
  dataRendered: state => state.dataRendered
};

const actions = {
  async getDataRenderedRequest({ commit }, id) {
    const result = await api.getDataRendered(id);
    commit("getDataRendered", result);
    return result;
  },
  async updateRenderedRequest({ commit }, data) {
    const result = await api.updateDataRendered(data);
    commit("updateRendered", result);
    return result;
  },
  async addRenderedRequest({ commit }, data) {
    const result = await api.addDataRendered(data);
    commit("addRendered", result);
    return result;
  },
  async removeRenderedRequest({ commit }, data) {
    const result = await api.removeRendered(data);
    commit("removeRendered", result);
    return result;
  }
};

const mutations = {
  getDataRendered(state, data) {
    state.dataRendered = data;
  },
  updateRendered(state, data) {
    const item = state.dataRendered.find(x => x.id === data.taskId);
    item[data.columnName] = data.newValue;
  },
  addRendered(state, data) {
    state.dataRendered.unshift(data);
  },
  removeRendered(state, id) {
    state.dataRendered = state.dataRendered.filter(x => x.id !== id)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    notes
  }
};
