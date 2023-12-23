import api from "../../api/matter.partient.profile";
import detail from "./matter.partient.profile.detail";
import tag from "./matter.partient.profile.tag";

const state = {
  dataPartientProfile: [],
  filterPartientProfile: {}
};
const getters = {
  dataPartientProfile: state => {
    const filter = Object.keys(state.filterPartientProfile);
    if (filter.length > 0) {
      let cloneDataPartientProfile = state.dataPartientProfile.slice();
      let { filterPartientProfile } = state;
      filter.forEach(key => {
        if (Array.isArray(filterPartientProfile[key])) {
          cloneDataPartientProfile = cloneDataPartientProfile.filter(x =>
            filterPartientProfile[key].includes(x[key])
          );
        } else {
          cloneDataPartientProfile = cloneDataPartientProfile.filter(
            x => x[key] === filterPartientProfile[key]
          );
        }
      });
      return cloneDataPartientProfile;
    }
    return state.dataPartientProfile;
  },
  hasFilter() {
    return Object.keys(state.filterPartientProfile).length > 0;
  }
};

const actions = {
  async getDataPartientProfileRequest({ commit }, page) {
    const result = await api.getDataPartientProfile(page);
    commit("getDataPartientProfile", result);
    return result;
  },
  async addDataPartientProfileRequest({ commit, state }, data) {
    const result = await api.addDataPartientProfile(data);
    result.id = state.dataPartientProfile.length + 1;
    commit("addDataPartientProfile", result);
    return result;
  },
  filterPartientProfileRequest({ commit }, filter) {
    commit("filterPartientProfile", filter);
  }
};

const mutations = {
  getDataPartientProfile(state, data) {
    state.dataPartientProfile = state.dataPartientProfile.concat(
      data.map((x, index) => {
        return { ...x, id: state.dataPartientProfile.length + index };
      })
    );
  },
  addDataPartientProfile(state, data) {
    state.dataPartientProfile.unshift(data);
  },
  filterPartientProfile(state, { name, value }) {
    state.filterPartientProfile = JSON.parse(
      JSON.stringify({ ...state.filterPartientProfile, [name]: value })
    );
  },
  cleanUpPageData(state) {
    state.dataPartientProfile = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    detail,
    tag
  }
};
