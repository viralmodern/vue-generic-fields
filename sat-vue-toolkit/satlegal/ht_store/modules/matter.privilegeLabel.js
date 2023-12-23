import api from "../../api/matter.privilegeLabel";

const state = {
  dataPrivilegeLabel: []
};
const getters = {
  dataPrivilegeLabel: state => state.dataPrivilegeLabel
};

const actions = {
  async getDataPrivilegeLabelRequest({ commit }, data = {}) {
    const result =  await api.getDataPrivilegeLabel(data);
    commit("getDataPrivilegeLabel", result);
    return result;
  },
  async addPrivilegeLabelRequest({ commit }, data = {}) {
    const result = await api.addPrivilegeLabel(data);
    commit("addPrivilegeLabel", result)
  },
  async updatePrivilegeLabelRequest({ commit }, data = {}) {
    const result = await api.updatePrivilegeLabel(data);
    commit("updatePrivilegeLabel", result)
  },
  async removePrivilegeLabelRequest({ commit }, data = {}) {
    api.removePrivilegeLabel(data);
    commit("removePrivilegeLabel", data.id)
  },
};

const mutations = {
  getDataPrivilegeLabel(state, data) {
    state.dataPrivilegeLabel = data;
  },
  addPrivilegeLabel(state, data) {
    state.dataPrivilegeLabel = [...state.dataPrivilegeLabel, data]
  },
  updatePrivilegeLabel(state, data) {
    state.dataPrivilegeLabel = state.dataPrivilegeLabel.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removePrivilegeLabel(state, id) {
    state.dataPrivilegeLabel = state.dataPrivilegeLabel.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
