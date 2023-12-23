import api from "../../api/workspace-subject";

const state = {
  subject: []
};
const getters = {
  subject: state => state.subject
};

const actions = {
  async getSubjectRequest({ commit }) {
    commit("getSubject", await api.getDataSubject());
  }
};

const mutations = {
  getSubject(state, data) {
    state.subject = data;
  },
  deleteSubject(state, data) {
    state.subject = state.subject.filter(x => x.id !== data);
  },
  addNewSubject(state, data) {
    state.subject.push(data);
  },
  editSubject(state, data) {
    state.subject = state.subject.map(x => {
      if (x.id === data.id) {
        return {
          ...x,
          ...data
        };
      }
      return x;
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
