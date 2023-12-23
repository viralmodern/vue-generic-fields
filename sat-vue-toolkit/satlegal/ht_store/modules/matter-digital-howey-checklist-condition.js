import api from "../../api/matter-digital-howey-checklist-condition";
import attachment from "./matter-digital-howey-checklist-condition-attachment"
import note from "./matter-digital-howey-checklist-condition-note"
import comment from "./matter-digital-howey-checklist-condition-comment"
const state = {
  dataCondition: {}
};

const getters = {
  dataCondition: state => state.dataCondition
};

const actions = {
  async getDatadataConditionRequest({ commit }) {
    commit("getDatadataCondition", await api.getDatadataCondition());
  },
  async editDescriptionRequest({ commit }, data) {
    commit("editDescription", await api.editDescription(data));
  },
  async updateConditionRequest({ commit }, data) {
    commit("updateCondition", await api.updateCondition(data));
  },
  async removeConditionRequest({ commit }, data) {
    commit("removeCondition", await api.removeCondition(data));
  }
};

const mutations = {
  getDatadataCondition(state, results) {
    state.dataCondition = results;
  },
  editDescription(state, results) {
    (state.dataCondition || {}).description = results;
  },
  updateCondition(state, data) {
    const item = (state.dataCondition.items || []).find(x => x.id === data.parentId);
    item[data.column] = data.value;
  },
  removeCondition(state, results) {
    state.dataCondition.items = (state.dataCondition.items || []).filter(
      x => x.id !== results
    );
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules: {
    attachment,
    note,
    comment
  }
};
