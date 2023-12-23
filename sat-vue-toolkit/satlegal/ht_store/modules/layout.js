import Cookies from "js-cookie";

// initial state
// shape: [{ id, quantity }]
const state = {
  dark: !!Cookies.getJSON("theme"),
  leftMenu: !Cookies.getJSON("hideLeftMenu"),
  rightType: "",
  toolbarType: null,
  isShowingProjectHeader: !!Cookies.getJSON("sph")
};

// getters
const getters = {
  dark: state => state.dark,
  leftMenu: state => state.leftMenu,
  rightType: state => state.rightType,
  isToolbarProjectType: state => state.toolbarType === "project",
  isToolbarNotebookType: state => state.toolbarType === "notebook",
  isToolbarHomeType: state => state.toolbarType === "home",
  isToolbarSettingType: state => state.toolbarType === "setting",
  isShowingProjectHeader: state => state.isShowingProjectHeader
};

// mutations
const mutations = {
  switchTheme(state, darkValue) {
    state.dark = !!darkValue;
    Cookies.set("theme", darkValue ? 1 : 0);
  },
  changeLeftMenu(state, value) {
    state.leftMenu = !!value;
    Cookies.set("hideLeftMenu", !value ? 1 : 0);
  },
  openRight(state, type) {
    state.rightType = state.rightType === type ? null : type;
  },
  setToolbarTypeToBeProjectType(state) {
    state.toolbarType = "project";
  },
  setToolbarTypeToBeNotebookType(state) {
    state.toolbarType = "notebook";
  },
  setToolbarTypeToBeHomeType(state) {
    state.toolbarType = "home";
  },
  setToolbarTypeToBeSettingType(state) {
    state.toolbarType = "setting";
  },
  showProjectHeader(state) {
    state.isShowingProjectHeader = true;
    Cookies.set("sph", 1);
  },
  hideProjectHeader(state) {
    state.isShowingProjectHeader = false;
    Cookies.set("sph", 0);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
