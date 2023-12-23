import api from "../../api/project-filing";
import comment from './project.filing.comment';
import version from './project.filing.version';

const state = {
  dataListGroupFiling: [],
  loadingDataFilingRoom: false,
  status: false,
  scroll: false
};

// getters
const getters = {
  dataListGroupFiling: state => state.dataListGroupFiling,
  loadingDataFilingRoom: state => state.loadingDataFilingRoom,
  status: state => state.status,
  scroll: state => state.scroll,
};

// actions
const actions = {
  async getDataListGroupFilingRequset({ commit }) {
    commit("setLoading", true);
    commit("getDataListGroupFiling", await api.getDataListGroupFiling());
    commit("setLoading", false);
  },
  async changeStatusListGroupFilingRequset({ commit }, data) {
    commit(
      "changeStatusListGroupFiling",
      await api.changeStatusListGroupFiling(data)
    );
  }
};

// mutations
const mutations = {
  getDataListGroupFiling(state, data) {
    state.dataListGroupFiling = data;
  },
  changeStatusListGroupFiling(state, data) {
    state.status = data.status;
  },
  setLoading(state, status) {
    state.loadingDataFilingRoom = status;
  },
  addDataListGroupFiling(state) {
    state.dataListGroupFiling.push({
      id: Math.random(),
      name: "new item",
      level: 1,
      children: []
    });
  },
  deleteDataListGroupFiling(state, data) {
    state.dataListGroupFiling = state.dataListGroupFiling.filter(
      item => item.id !== data
    );
  },
  renameDataListGroupFiling(state, data) {
    var temp = [...state.dataListGroupFiling];
    updateTree(temp, data.id, data.name);
    state.dataListGroupFiling = [...temp]
  },
  updateDataListGroupFiling(state, data) {
    state.dataListGroupFiling = state.dataListGroupFiling.map(e => {
      if (e === data.id) {
        return { ...e, name: data.name };
      }
      return e;
    });
  },
  addDataTreeView(state, data) {
    var temp = [...state.dataListGroupFiling];
    addTree(temp, data.parentId, data.item.name);
    state.dataListGroupFiling = [...temp]
  },
  setScroll(state, status){
    state.scroll = status
  }
};


function updateTree(tree, id, name) {
  var result = false;
  if (!tree) return result
  var i = 0;
  for (i = 0; i < tree.length; i++) {
    if (tree[i].id == id) {
      tree[i].name = name;
      break;
    }
    else {
      result = updateTree(tree[i].children, id, name);
      if (result) { break; }
    }
  }
  if (i == tree.length) { result = false; }
  else { result = true; }
  return result;
}

function addTree(tree, id, name) {
  var result = false;
  if (!tree) return result
  var i = 0;
  for (i = 0; i < tree.length; i++) {
    if (tree[i].id == id) {
      let newItem = {
        id: Math.random(),
        name,
        level: tree[i].level + 1,
        status: "Backlog"
      }
      if (tree[i].level < 2) newItem.children = []
      tree[i].children = [...tree[i].children, newItem]
      break;
    }
    else {
      result = addTree(tree[i].children, id, name);
      if (result) { break; }
    }
  }
  if (i == tree.length) { result = false; }
  else { result = true; }
  return result;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    comment,
    version
  }
};
