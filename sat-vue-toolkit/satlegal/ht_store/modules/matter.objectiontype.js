import api from "../../api/matter.objectiontype";

const state = {
  dataObjectionTypes: []
};

const getters = {
  dataObjectionTypes: state => state.dataObjectionTypes
};

const actions = {
  async getDataObjectionTypeRequest({ commit }, data = {}) {
    const result =  await api.getDataObjectionType(data);
    commit("getDataObjectionType", result);
    return result;
  },
  async addObjectionTypeRequest({ commit }, data = {}) {
    const result = await api.addObjectionType(data);
    commit("addObjectionType", result)
  },
  async updateObjectionTypeRequest({ commit }, data = {}) {
    const result = await api.updateObjectionType(data);
    commit("updateObjectionType", result)
  },
  async removeObjectionTypeRequest({ commit }, data = {}) {
    api.removeObjectionType(data);
    commit("removeObjectionType", data.id)
  },
};

const mutations = {
  getDataObjectionType(state, data) {
    state.dataObjectionTypes = data;
  },
  addObjectionType(state, data) {
    state.dataObjectionTypes = [...state.dataObjectionTypes, data]
  },
  updateObjectionType(state, data) {
    state.dataObjectionTypes = state.dataObjectionTypes.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },
  removeObjectionType(state, id) {
    state.dataObjectionTypes = state.dataObjectionTypes.filter(x => x.pk !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
