import api from "../../api/client-portal.matter.casebrief";

const state = {
  dataCaseBrief: []
};
const getters = {
  dataCaseBrief: state => state.dataCaseBrief
};

const actions = {
  async getDataCaseBrief({ commit }) {
    commit("getDataCaseBrief", await api.getDataCaseBrief())
  },
  async createItemCaseBrief({ commit }, data) {
    commit("createItemCaseBrief", data)
  },
  async removeItem({ commit }, data) {
    commit("removeItem", data)
  },
  async updateItem({ commit }, data) {
    commit("updateItem", data)
  }
};

const mutations = {
  createItemCaseBrief(state, obj) {
    var temp = [...state.dataCaseBrief];
    newTree(temp, obj.item.id, obj.name);
    state.dataCaseBrief = [...temp]
  },
  updateItem(state, obj) {
    var temp = [...state.dataCaseBrief];
    updateTree(temp, obj.data.id, obj.data.name);
    state.dataCaseBrief = [...temp]
  },
  removeItem(state, obj) {
    var temp = [...state.dataCaseBrief];
    deleteTree(temp, obj.items.id, obj.items.name);
    state.dataCaseBrief = [...temp]
  },
  getDataCaseBrief(state, results) {
    state.dataCaseBrief = results
  }
};

function deleteTree(tree, id, name) {
  var result = false;
  if (!tree) return result
  var i = 0;
  for (i = 0; i < tree.length; i++) {
    if (tree[i].id == id) {
      tree.splice(i, 1);
    }
    else {
      result = deleteTree(tree[i].children, id, name);
      if (result) { break; }
    }
  }
  if (i == tree.length) { result = false; }
  else { result = true; }
  return result;
}

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

function newTree(tree, id, name) {
  var result = false;
  if (!tree) return result
  var i = 0;
  for (i = 0; i < tree.length; i++) {
    if (tree[i].id == id) {
      let newItem = {
        id: Math.random(),
        name,
        children: []
      }
      tree[i].children.push(newItem)
      break;
    }
    else {
      result = newTree(tree[i].children, id, name);
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
};
