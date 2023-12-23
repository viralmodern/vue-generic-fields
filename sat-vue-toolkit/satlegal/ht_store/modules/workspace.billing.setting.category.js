import api from "../../api/billing.setting.category";
const state = {
  categories: []
};
const getters = {
  categories: state => state.categories
};

const actions = {
  async getDataSettingCategoryRequest({ commit }) {
    commit("getDataSettingCategory", await api.getCategory());
  },
  async updateSettingCategoryRequest({ commit }, data) {
    commit("updateSettingCategory", await api.updateSettingCategory(data));
  },
  async deleteCategoryRequest({ commit }, data) {
    commit("deleteCategory", await api.deleteCategory(data));
  },
  async addCategoryRequest({ commit }, data) {
    commit("addCategory", await api.addCategory(data));
  }
};

const mutations = {
  async getDataSettingCategory(state, data) {
    state.categories = data;
  },
  async addCategory(state, data) {
    state.categories.unshift(data);
  },
  async deleteCategory(state, id) {
    state.categories = state.categories.filter(x => x.id !== id);
  },
  async updateSettingCategory(state, data) {
    let item = state.categories.find(x => x.id === data.parentId);
    item[data.column] = data.value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
