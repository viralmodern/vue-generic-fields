import api from "../../api/matter.digitalHoweyChecklist";
import task from "./matter.digitalHoweyChecklist.task";

const state = {
  dataListBoard: []
};

const getters = {
  dataListBoard: state => state.dataListBoard
};

const actions = {
  async getDataListBoardRequest({ commit }) {
    commit("getdataListBoard", await api.getDataListBoard());
  },
  async addBoardRequest({ commit }, data) {
    commit("addBoard", await api.addBoard(data));
  },
  async deleteBoard({ commit }, data) {
    commit("deleteBoardSuccess", data);
  }
};

const mutations = {
  getdataListBoard(state, dataListBoard) {
    state.dataListBoard = dataListBoard;
  },
  addBoard(state, data) {
    state.dataListBoard.push(data);
  },
  deleteBoardSuccess(state, item) {
    state.dataListBoard = state.dataListBoard.filter(x => x.id !== item.id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    task
  }
};
