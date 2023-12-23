import api from "../../api/project.client";

const state = {
  clients: []
};

const getters = {
  dataClients: state => {
    return state.clients.map(x => ({
      avatar: {
        email: x.email,
        first_name: x.first_name,
        imageUrl: x ? x.avatar : "",
        last_name: x.last_name,
        name: x.first_name + ' ' + x.middle_name + ' ' + x.last_name,
        nickName: x.middle_name
      },
      email: x.email,
      first_name: x.first_name,
      id: x.pk,
      last_name: x.last_name,
      name: x.first_name + ' ' + x.middle_name + ' ' + x.last_name,
      session_id: "d7c70f84-a77f-44b0-b0fe-bb03c61c8aa1" + Math.random(),
      username: x.first_name,
      workspaces: [{ name: "sat-prj", logo: null }]
    }));
  }
};

const actions = {
  async getDataClientsRequest({ commit }) {
    const result = await api.getClients();
    commit("getDataClients", result.results);
    return result;
  }
};

const mutations = {
  getDataClients(state, data) {
    state.clients = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
