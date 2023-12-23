import api from "../../api/matter.character.relationshipMap";

const state = {
  dataRelationship: []
};
const getters = {
  dataRelationship: state => {
    const dataMap = (state.dataRelationship || []).map(x => {
      return {
        id: x.pk,
        from_id: x.from_character.pk,
        to_id: x.to_character.pk,
        value: x.relationship_type
      }
    })
    return dataMap
  }
};

const actions = {
  async getDataRelationshipRequest({ commit }, matterId) {
    const result = await api.getDataRelationship(matterId);
    commit("getDataRelationship", result);
    return result;
  },
  async addDataRelationshipRequest({ commit }, data) {
    const result = await api.addDataRelationship(data);
    commit("addDataRelationship", result);
    return result;
  },
  async updateDataRelationshipRequest({ commit }, data) {
    const result = await api.updateDataRelationship(data);
    commit("updateDataRelationship", result);
    return result;
  },
  async removeDataRelationshipRequest({ commit }, data) {
    const result = await api.removeDataRelationship(data);
    commit("removeDataRelationship", data.id);
    return result;
  },
};

const mutations = {
  getDataRelationship(state, data) {
    state.dataRelationship = data;
  },
  addDataRelationship(state, data) {
    state.dataRelationship = [...state.dataRelationship, data];
  },
  updateDataRelationship(state, data) {
    state.dataRelationship = state.dataRelationship.map(x => {
      if (x.pk === data.pk) {
        return { ...x, relationship_type: data.relationship_type };
      }
      return x;
    });
  },
  removeDataRelationship(state, pk) {
    state.dataRelationship = state.dataRelationship.filter(x => x.pk !== pk);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
