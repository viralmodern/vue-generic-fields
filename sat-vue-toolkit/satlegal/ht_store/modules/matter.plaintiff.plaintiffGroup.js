import api from "../../api/matter.plaintiff.plaintiffGroup";

const state = {
  labelPlaintiff: []
};

const getters = {
  labelPlaintiff: state => state.labelPlaintiff
};

const actions = {
  async getDataPlaintiffGroup({ commit }) {
    commit("getDataPlaintiffGroup", await api.getDataPlaintiffGroup());
  },
  async create({ commit }, data) {
    commit("create", data, await api.create(data))
  },
  async update({ commit }, data) {
    commit("update", data, await api.update(data))
  },
  async remove({ commit }, data) {
    commit("remove", data, await api.remove(data))
  },
};

const mutations = {
  getDataPlaintiffGroup(state, data) {
    state.labelPlaintiff = data;
  },
  create(state, data) {
    state.labelPlaintiff = [...state.labelPlaintiff, data]
  },
  update(state, data) {
    var issue = state.labelPlaintiff.find(x => x.id === data.id);
    issue.name = data.labelName;
    issue.color = data.colorValue;
  },
  remove(state, id) {
    state.labelPlaintiff = state.labelPlaintiff.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
