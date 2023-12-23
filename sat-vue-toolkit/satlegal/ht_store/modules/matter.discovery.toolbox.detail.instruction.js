import api from "../../api/matter.discovery.toolbox.detail.instruction";

const state = {
  dataInstruction: [],
  totals: 0
};
const getters = {
  dataInstruction: state => state.dataInstruction,
  totals: state => state.totals,
};

const actions = {
  async getDataInstructionRequest({ commit }, data) {
    const result = await api.getDataInstruction(data);
    commit("getDataInstruction", result);
    return result;
  },
  async addInstructionRequest({ commit }, data) {
    const result = await api.addInstruction(data);
    commit("addInstruction", result);
    return result;
  },
  async updateInstructionRequest({ commit }, data) {
    api.updateInstruction(data);
    commit("updateInstruction", {
      id: data.idParams.instructionId,
      ...data.body
    });
  },
  async removeInstructionRequest({ commit }, data) {
    api.removeInstruction(data);
    commit("removeInstruction", data.instructionId);
  }
};

const mutations = {
  getDataInstruction(state, { results, count }) {
    state.dataInstruction = results;
    state.totals = count;
  },
  addInstruction(state, data) {
    state.dataInstruction.unshift(data);
    state.totals++;
  },
  updateInstruction(state, data) {
    state.dataInstruction = state.dataInstruction.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeInstruction(state, id) {
    state.dataInstruction = state.dataInstruction.filter(x => x.id !== id);
    state.totals--;
  },
  cleanUpPageData(state) {
    state.dataInstruction = [];
    state.totals = 0;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
