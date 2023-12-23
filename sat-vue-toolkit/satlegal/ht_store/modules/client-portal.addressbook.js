import api from "../../api/client-portal.addressbook";

const state = {
  dataPortalAddressbook: []
};

const getters = {
  dataPortalAddressbook: state => state.dataPortalAddressbook
};

const actions = {
  async getDataPortalAddressbook({ commit }) {
    commit("getDataPortalAddressbook", await api.getDataPortalAddressbook());
  },
  async updateTask({ commit }, data) {
    commit("updateTaskSuccess", data);
  },
  async createNewContact({ commit }, data) {
    commit("createNewContact", data, await api.createNewContact(data));
  }
};

const mutations = {
  getDataPortalAddressbook(state, dataPortalAddressbook) {
    state.dataPortalAddressbook = dataPortalAddressbook;
  },
  createNewContact(state, data) {
    state.dataPortalAddressbook = [...state.dataPortalAddressbook, data];
  },
  updateTaskSuccess(state, data) {
    const task = state.dataPortalAddressbook.find(x => x.id === data.taskId);
    switch (data.columnName) {
      case "name":
        task.user.name = data.newValue;
        break;
      case "email":
        task.user.email = data.newValue;
        break;
      case "phone":
        task.user.phone = data.newValue;
        break;
      case "actions":
        state.dataPortalAddressbook = state.dataPortalAddressbook.filter(
          x => x.id !== data.taskId
        );
        break;
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
