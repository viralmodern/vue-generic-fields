import api from "../../api/task.detail";

const state = {
  dataCitation: [],
  status: false,
  message: ""
};

const getters = {
  dataCitation: state => state.dataCitation,
  status: state => state.status,
  message: state => state.message
};

const actions = {
  async getDataCitationRequest({ commit }) {
    commit("getDataCitation", await api.getDataCitation());
  },
  async addDataCitationRequest({ commit }) {
    const result = await api.addDataCitation();
    commit("handleActionSuccess", result);
    return result;
  },
  async updateDataCitationRequest({ commit }) {
    const result = await api.updateDataCitation();
    commit("handleActionSuccess", result);
    return result;
  }
};

const mutations = {
  getDataCitation(state, dataCitation) {
    state.dataCitation = dataCitation;
  },
  addCitation(state, data) {
    state.dataCitation.push({ id: Math.random(), ...data });
  },
  updateCitation(state, data) {
    state.dataCitation = state.dataCitation.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeCitation(state, id) {
    state.dataCitation = state.dataCitation.filter(x => x.id !== id);
  },
  handleActionSuccess(state, data) {
    state.status = data.status;
    state.message = data.message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
