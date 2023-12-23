import api from "../../api/negligence.injury";
import label from "./matter.partient.injury.label";
import detail from "./matter.partient.injury.detail";
const state = {
  injurys: []
};
const getters = {
  injurys: state => state.injurys
};

const actions = {
  async getDataInjuryNegligenceRequest({ commit }) {
    commit("getDataInjuryNegligence", await api.getDataInjuryNegligence());
  },
  async addInjuryRequest({ commit }, data) {
    commit("addInjurys", data, await api.addInjurys(data));
  },
  async updateInjuryRequest({ commit }, data) {
    commit("updateInjurys", data, await api.updateInjurys(data));
  },
  async editInjuryRequest({ commit }, data) {
    const result = await api.editInjury(data);
    commit("editInjury", data);
    return result;
  },
  async removeInjuryRequest({ commit }, data) {
    commit("removeInjurys", data, await api.removeInjurys(data));
  }
};

const mutations = {
  getDataInjuryNegligence(state, data) {
    state.injurys = data;
  },
  addInjurys(state, data) {
    state.injurys = [data, ...state.injurys ];
  },
  updateInjurys(state, data) {
    var issue = state.injurys.find(x => x.id === data.id);
    issue.name = data.labelName;
    issue.color = data.colorValue;
  },
  editInjury(state, data) {
    const item = state.injurys.find(x => x.id === data.parentId);
    item[data.column] = data.value;
  },
  removeInjurys(state, id) {
    state.injurys = state.injurys.filter(x => x.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    label,
    detail
  }
};
