import api from "../../api/matter.partient.practice.detail.checklist";

const state = {
  dataCheckList: []
};
const getters = {
  dataCheckList: state => state.dataCheckList
};

const actions = {
  async getDataCheckListRequest({ commit }) {
    commit("getCheckList", await api.getCheckList());
  },
  async addGroupChecklistRequest({ commit }, data) {
    const result = await api.addGroupChecklist(data);
    commit("addGroupChecklist", result);
    return result;
  },
  async removeGroupChecklistRequest({ commit }, data) {
    const result = await api.deleteGroupChecklist(data);
    commit("removeGroupChecklist", result);
    return result;
  },
  async addItemInGroupChecklistRequest({ commit }, data) {
    const result = await api.addItemInGroupChecklist(data);
    commit("addItemInGroupChecklist", result);
    return result;
  },
  async removeItemInGroupChecklistRequest({ commit }, data) {
    const result = await api.removeItemInGroupChecklist(data);
    commit("removeItemInGroupChecklist", result);
    return result;
  },
  async updateItemInGroupChecklistRequest({ commit }, data) {
    const result = await api.updateItemInGroupChecklist(data);
    commit("updateItemInGroupChecklist", result);
    return result;
  },
  async checkItemRequest({ commit }, data) {
    const result = await api.checkItem(data);
    commit("checkItem", result);
    return result;
  }
};

const mutations = {
  getCheckList(state, data) {
    state.dataCheckList = data
  },
  addGroupChecklist(state, groupName) {
    state.dataCheckList.push({
      id: Math.random(),
      groupName,
      list: []
    });
  },
  removeGroupChecklist(state, idChecklist) {
    state.dataCheckList = state.dataCheckList.filter(
      x => x.id !== idChecklist
    );
  },
  addItemInGroupChecklist(state, name) {
    state.dataCheckList
      .find(x => x.id === name.groupId)
      .list.push({
        id: Math.random(),
        name: name.name,
        status: false
      });
  },
  removeItemInGroupChecklist(state, data) {
    let findOneAndRemove = state.dataCheckList.find(
      x => x.id === data.groupId
    );
    findOneAndRemove.list = findOneAndRemove.list.filter(x => x.id !== data.id);
  },
  updateItemInGroupChecklist(state, data) {
    let findOneAndRemove = state.dataCheckList.find(
      x => x.id === data.groupId
    );
    findOneAndRemove.list.find(x => x.id === data.id).name = data.name;
  },
  checkItem(state, data) {
    let findOneAndUpdate = state.dataCheckList.find(
      x => x.id === data.groupId
    );
    findOneAndUpdate.list.find(x => x.id === data.id).status = data.status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
