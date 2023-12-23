import api from "../../api/matter.discovery.summary";

const state = {
  dataSummary: []
}

const getters = {
  dataSummary: state => state.dataSummary
}

const actions = {
  async getDataDiscoverySummary({ commit }) {
    commit("getDataDiscoverySummary", await api.getDataDiscoverySummary())
  },
  async addGroupChecklist({ commit }, groupName) {
    commit("addGroupChecklist", groupName, await api.addGroupChecklist(groupName))
  },
  async removeGroupChecklist({ commit }, idChecklist) {
    commit("removeGroupChecklist", idChecklist, await api.removeGroupChecklist(idChecklist))
  },
  async addItemInGroupChecklist({ commit }, name) {
    commit("addItemInGroupChecklist", name, await api.addItemInGroupChecklist(name))
  },
  async removeItemInGroupChecklist({ commit }, data) {
    commit("removeItemInGroupChecklist", data, await api.removeItemInGroupChecklist(data))
  },
  async updateItemInGroupChecklist({ commit }, data) {
    commit("updateItemInGroupChecklist", data, await api.updateItemInGroupChecklist(data))
  },
  async checkItem({ commit }, data) {
    commit("checkItem", data, await api.checkItem(data))
  }
}

const mutations = {
  getDataDiscoverySummary(state, dataSummary) {
    state.dataSummary = dataSummary
  },
  addGroupChecklist(state, name) {
    state.dataSummary.checkList.push({
      id: Math.random(),
      groupName: name,
      list: []
    });
  },
  removeGroupChecklist(state, idChecklist) {
    state.dataSummary.checkList = state.dataSummary.checkList.filter(
      x => x.id !== idChecklist
    );
  },
  addItemInGroupChecklist(state, name) {
    state.dataSummary.checkList
      .find(x => x.id === name.groupId)
      .list.push({
        id: Math.random(),
        name: name.name,
        status: false
      });
  },
  removeItemInGroupChecklist(state, data) {
    let findOneAndRemove = state.dataSummary.checkList.find(
      x => x.id === data.groupId
    );
    findOneAndRemove.list = findOneAndRemove.list.filter(x => x.id !== data.id);
  },
  updateItemInGroupChecklist(state, data) {
    let findOneAndRemove = state.dataSummary.checkList.find(
      x => x.id === data.groupId
    );
    findOneAndRemove.list.find(x => x.id === data.id).name = data.name;
  },
  checkItem(state, data) {
    let findOneAndUpdate = state.dataSummary.checkList.find(
      x => x.id === data.groupId
    );
    findOneAndUpdate.list.find(x => x.id === data.id).status = data.status;
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
