import userApi from "../../api/user";

// initial state
// shape: [{ id, quantity }]
const state = {
  currentUser: {},
  getUser: null,
  dataUser: [],
  dataListUser: []
};

// getters
const getters = {
  currentUser: state => state.currentUser,
  getUser: state => state.getUser,
  getName: state => {
    try {
      return state.currentUser.name
    }catch (e) {
      return ""
    }
  },
  getFirstName: state => {
    try {
      return state.currentUser.first_name;
    }catch (e) {
      return ""
    }
  },
  getLastName: state => {
    try {
      return state.currentUser.last_name;
    }catch (e) {
      return ""
    }
  },
  getUsername: state => {
    try {
      return state.currentUser.username || state.currentUser.name;
    }catch (e) {
      return ""
    }
  },
  getAvatar: state => {
    try {
      return state.currentUser.avatar;
    }catch (e) {
      return ""
    }
  },
  getAvatarFile: state => {
    try {
      return state.currentUser.avatarFile;
    }catch (e) {
      return ""
    }
  },




  dataUser: state => state.dataUser,
  dataListUser: state => state.dataListUser,
};

// actions
const actions = {
  async getCurrentUser({commit}) {
    const currentUser = await userApi.getMe();
    commit("getCurrentUserSuccess", currentUser);
  },
  async getUserInProject({commit}, id) {
    const listUser = await userApi.getListUser(id);
    commit("getUserShowProject", listUser);
  },
  async updateCurrentUser({commit}, data) {
    const currentUser = await userApi.updateProfile(data);
    commit("setCurrentUser", currentUser);
  },

  async getListUserRequest({ commit }) {
    const users = await userApi.getListUser();
    commit("getListUserSuccess", users);
  },
  async getDataListUserRequest({ commit }) {
    commit("getDataListUser", await userApi.getDataListUser());
  }
};

// mutations
const mutations = {
  getCurrentUserSuccess(state, currentUser) {
    state.currentUser = currentUser;
  },
  getUserShowProject(state, listUser) {
    state.getUser = listUser.dataUser;
  },
  setCurrentUser(state, user) {
    state.currentUser = {...state.currentUser, ...user};
  },
  getListUserSuccess(state, data) {
    state.dataUser = data.dataUser;
  },
  getDataListUser(state, data) {
    state.dataListUser = [{ id: 0, sortable: false }, ...data.map(e => ({ ...e, sortable: false }))];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
