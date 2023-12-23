import api from "../../api/workspace-member";
const state = {
  members: []
};
const getters = {
  members: state => {
    return state.members.map(x => ({
      avatar: {
        email: x.user.email,
        first_name: x.user.first_name,
        imageUrl: x.user ? x.user.avatar : '',
        last_name: x.user.last_name,
        name: x.user.name,
        nickName: x.user.name
      },
      email: x.user.email,
      first_name: x.user.first_name,
      id: x.user.pk,
      last_name: x.user.last_name,
      name: x.user.name,
      session_id: "d7c70f84-a77f-44b0-b0fe-bb03c61c8aa1" + Math.random(),
      username: x.user.username,
      workspaces: [{ name: "sat-prj", logo: null }]
    }));
  }
};

const actions = {
  async getDataMemberRequest({ commit }) {
    commit("getDataMember", await api.getDataMembers());
  }
};

const mutations = {
  async getDataMember(state, data) {
    state.members = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
