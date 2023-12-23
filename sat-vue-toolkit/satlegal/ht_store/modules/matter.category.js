import api from "../../api/matter.category";

const state = {
  dataCategory: [],
  titleAZ: ""
}

const getters = {
  titleAZ: state => state.titleAZ,
  dataCategory: state => state.dataCategory
}

const actions = {
  async getDataCategory({ commit }) {
    commit("getDataCategory", await api.getDataCategory());
  },
  async activeList({ commit }, data) {
    commit("activeList", data)
  },
  async removeUserInCateogry({ commit }, data) {
    commit("removeUserInCateogry", data)
  },
  async addCategory({ commit }, data) {
    commit("addCategory", data)
  },
  async createCategoryUser({ commit }, data) {
    commit("createCategoryUser", data)
  }
}

const mutations = {
  getDataCategory(state, data) {
    state.dataCategory = data;
  },
  activeList(state, data) {
    state.dataCategory = state.dataCategory && state.dataCategory.map(x => {
      if (x.id === data.id) {
        return { ...x, isActive: true }
      } else
        return { ...x, isActive: false }
    })
  },
  changeFilterAZ(state, text) {
    state.titleAZ = text
  },
  removeUserInCateogry(state, data) {
    let result = state.dataCategory.find(x => x.id === data.objUser.id)
    result.children = result.children.filter(t => t.id !== data.item.id)
  },
  addCategory(state, data) {
    state.dataCategory = [...state.dataCategory, data]
  },
  createCategoryUser(state, data) {
    let result = state.dataCategory.find(x => x.id === data.category)
    result.children = [...result.children, data]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
