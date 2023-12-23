import api from "../../api/admin-setting";
import workFlow from "./admin-setting-workflow"
// initial state
// shape: [{ id, quantity }]
const state = {
  users: {},
  totals: 0,
  loading: false,
  roles: [],
  userAdmin: {},
  currencies: [],
  timezones: [],
  dataNotifications: [],
  loadingNitify: false
};

// getters
const getters = {
  users: state => state.users,
  totals: state => state.totals,
  loading: state => state.loading,
  roles: state => state.roles,
  userAdmin: state => state.userAdmin,
  currencies: state => state.currencies,
  timezones: state => state.timezones,
  dataNotifications: state => state.dataNotifications,
  loadingNitify: state => state.loadingNitify
};

const actions = {
  async getListusersRequest({ commit }, pagination = {}) {
    commit("startLoading");
    const { page, pageSize } = pagination;
    const filterRequest = {
      pageSize,
      pageIndex: page
    };
    commit("getListusers", await api.listUserAdmin(filterRequest));
    commit("finishLoading");
  },
  async getListRoleRequest({ commit }) {
    commit("getListRole", await api.listRoleUser());
  },
  async getUserPermissionAdminRequest({ commit }) {
    commit("getUserPermissionAdmin", await api.getUserPermissionAdmin());
  },
  async getDataCurencyRequest({ commit }) {
    commit("getDataCurency", await api.listCurrency());
  },
  async getDataTimezoneRequest({ commit }) {
    commit("getDataTimezone", await api.listTimezone());
  },
  async getDataNotificationsRequest({ commit }) {
    commit("loadingNitifySuccess", true);
    commit("getDataNotificationsSuccess", await api.listDataNotifications());
    commit("loadingNitifySuccess", false);
  }
};

const mutations = {
  getListusers(state, filterResult) {
    state.users = filterResult.userAdmin;
  },
  startLoading(state) {
    state.loading = true;
  },
  finishLoading(state) {
    state.loading = false;
  },
  deleteUser(state, user) {
    state.users = {
      ...state.users,
      list: state.users.list.filter(x => x.id !== user.id)
    };
  },
  editItemAdmin(state, data) {
    state.users = {
      ...state.users,
      list: state.users.list.map(x => {
        if (x.id === data.id) {
          return { ...x, ...data };
        }
        return x;
      })
    };
  },
  editAdminCompanySetting(state, data){
    state.userAdmin = {...state.userAdmin , ...data}
  },
  addItemAdmin(state, data) {
    state.users.list = [
      {
        id: state.users.list.length + 1,
        fullName: data.fullName,
        avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        role: data.role,
        email: data.email,
        password: data.password
      },
      ...state.users.list
    ];
  },
  getListRole(state, roles) {
    state.roles = roles;
  },
  getUserPermissionAdmin(state, userAdmin) {
    state.userAdmin = userAdmin;
  },
  getDataCurency(state, currencies) {
    state.currencies = currencies;
  },
  getDataTimezone(state, timezones) {
    state.timezones = timezones;
  },
  getDataNotificationsSuccess(state, dataNotifications) {
    state.dataNotifications = dataNotifications;
  },
  loadingNitifySuccess(state, status) {
    state.status = status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    workFlow
  }
};
