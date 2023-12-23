import api from "../../api/task.detail";

const state = {
  dataListNotes: []
};

const getters = {
  dataListNotes: state => state.dataListNotes
};

const actions = {
  async getDataNotesRequest({ commit }) {
    commit("getDataNotes", await api.getListNotes());
  }
};

const mutations = {
  getDataNotes(state, dataListNotes) {
    state.dataListNotes = dataListNotes;
  },
  addNotes(state, data) {
    state.dataListNotes.unshift({
      id: state.dataListNotes.length + Math.random(),
      peopleWriter: "Thomas Harvey",
      avatar: "https://icons-for-free.com/free-icons/png/512/628292.png",
      title: data.title,
      content: data.description,
      createdAt: new Date().toISOString()
    });
  },
  deleteNotes(state, id) {
    state.dataListNotes = state.dataListNotes.filter(e => e.id !== id);
  },
  editNotes(state, data) {
    let note = state.dataListNotes.find(e => e.id === data.id);
    note.title = data.title;
    note.content = data.content;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
