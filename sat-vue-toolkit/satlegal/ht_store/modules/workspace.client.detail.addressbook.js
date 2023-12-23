import api from "../../api/client.detail.addressbook";

const state = {
  dataClientAddressbook: []
}

const getters = {
  dataClientAddressbook: state => state.dataClientAddressbook
}

const actions = {
  async getDataClientAddressbook({ commit }) {
    commit("getDataClientAddressbook", await api.getDataClientAddressbook())
  },
  async updateTask({ commit }, data) {
    commit("updateTaskSuccess", data)
  },
  async createNewContact({ commit }, data) {
    commit("createNewContact", data, await api.createNewContact(data));
  }
}

const mutations = {
  getDataClientAddressbook(state, dataClientAddressbook) {
    state.dataClientAddressbook = dataClientAddressbook
  },
  createNewContact(state, data) {
    state.dataClientAddressbook = [...state.dataClientAddressbook, data];
  },
  updateTaskSuccess(state, data) {
    const task = state.dataClientAddressbook.find(
      x => x.id === data.taskId
    );
    switch (data.columnName) {
      case "name":
        task.user.name = data.newValue
        break;
      case "email":
        task.user.email = data.newValue
        break;
      case "phone":
        task.user.phone = data.newValue
        break;
      case "actions":
        state.dataClientAddressbook = state.dataClientAddressbook.filter(x => x.id !== data.taskId)
        break;
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
