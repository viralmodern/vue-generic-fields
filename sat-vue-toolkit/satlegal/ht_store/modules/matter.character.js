import api from "../../api/matter.character";
import relationship from "./matter.character.relationshipMap";
import characterProfile from "./matter.character.profile.detail";

const state = {
  character: []
};
const getters = {
  character: state => {
    return state.character.map(x => ({
      avatar: {
        email: x.emails[0],
        imageUrl: x.avatar, // tren api khong thay tra ve
        name: x.last_name + " " + x.first_name,
        nickName: x.last_name + " " + x.first_name,
        phone: x.phone[0],
        type: x.character_types[0]
      },
      color: "primary", // khong thay tra ve
      email: x.emails[0],
      first_name: x.first_name,
      last_name: x.last_name,
      id: x.pk,
      isActive: false, // khong thay api tra ve
      name: x.last_name + " " + x.first_name,
      nickName: x.last_name + " " + x.first_name
    }));
  }
};

const actions = {
  async getDataCharacterRequest({ commit }, data = {}) {
    const result = await api.getDataCharacter(data);
    commit("getDataCharacter", result);
    return result;
  },
  async addDataCharacterRequest({ commit }, data) {
    const result = await api.addDataCharacter(data);
    commit("addDataCharacter", result);
    return result;
  },
  async updateDataCharacterRequest({ commit }, data) {
    const result = await api.updateDataCharacter(data);
    commit("updateDataCharacter", result);
    return result;
  },
  async deleteDataCharacterRequest({ commit }, data) {
    const result = await api.deleteDataCharacter(data);
    commit("deleteDataCharacter", data);
    return result;
  }
};

const mutations = {
  getDataCharacter(state, data) {
    state.character = data;
  },
  addDataCharacter(state, data) {
    state.character.push(data);
  },
  updateDataCharacter(state, data) {
    state.character = state.character.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  deleteDataCharacter(state, data) {
    state.character = state.character.filter(x => x.pk !== data.id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    relationship,
    characterProfile
  }
};
