import api from "../../api/matter.docket";
import tag from "./matter.briefcase.docket.tag";
import attachment from "./matter.briefcase.docket.attachment";
const state = {
  dockets: [],
  information: {}
};
const getters = {
  dockets: state => state.dockets,
  information: state => state.information
};

const actions = {
  async getDataDocketRequest({ commit }) {
    commit("getDataDocket", await api.getDataDocket());
  },
  async updateDocketRequest({ commit }, data) {
    commit("updateDocket", await api.updateDocket(data));
    commit("changeDateInfomation", await api.changeDate());
  },
  async deleteDocketRequest({ commit }, id) {
    commit("deleteDocket", await api.deleteDocket(id));
  },
  async addDocketRequest({ commit }, data) {
    commit("addDocket", await api.addDocket(data));
  },
  async addAtachmentRequest({ commit }, data) {
    commit("addAtachment", data);
  },
  async getInformationRequest({ commit }) {
    commit("getInformation", await api.getInformation());
  },
  async changeDataRequest({ commit }, data) {
    commit("changeData", await api.changeDataInfomation(data));
  },
};

const mutations = {
  getDataDocket(state, data) {
    state.dockets = data;
  },
  getInformation(state, data) {
    state.information = data;
  },
  changeData(state, data) {
    state.information[data.column] = data.value;
  },
  changeDateInfomation(state, data){
    state.information.lastUpdate = data;
  },
  updateDocket(state, data) {
    const item = state.dockets.find(x => x.id === data.parentId);
    item[data.column] = data.value;
  },
  deleteDocket(state, id) {
    state.dockets = state.dockets.filter(x => x.id !== id);
  },
  addDocket(state, data) {
    state.dockets.unshift(data);
  },
  addAtachment(state, data) {
    const item = state.dockets.find(x => x.id === data.taskId);
    item.attachment.push(data.value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    tag,
    attachment
  }
};
