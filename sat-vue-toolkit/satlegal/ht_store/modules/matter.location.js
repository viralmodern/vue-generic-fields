import api from "../../api/matter.location";

const state = {
  locations: []
};
const getters = {
  locations: state => state.locations
};

const actions = {
  async getDataLocationRequest({ commit }) {
    commit("getDataLocation", await api.listLocation());
  }
};

const mutations = {
  getDataLocation(state, data) {
    state.locations = data;
  },
  removeLocation(state, id) {
    state.locations = state.locations.filter(x => x.id !== id);
  },
  addLocation(state, data) {
    state.locations.push(data);
  },
  editLocation(state, data) {
    state.locations = state.locations.map(x => {
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
