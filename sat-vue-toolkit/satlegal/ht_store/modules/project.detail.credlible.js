import { dataProjectBoard } from "../../mock-data/data-credlible";

const state = {
  dataProject: {}
};

const getters = {
  getDataProject(state) {
    return state.dataProject;
  }
};

const actions = {
  getDataProject({ commit }) {
    commit("setDataProject", dataProjectBoard);
  },
  updateBlock({ commit }, card) {
    commit("updateBlock", card);
  },
  addColumn({ commit }, title) {
    commit("addColumn", title);
  },
  addBlock({ commit }, cardData) {
    commit("addBlock", cardData);
  },
  editColumnTitle({ commit }, stage) {
    commit("editColumnTitle", stage);
  },
  deleteColumn({ commit }, index) {
    commit("deleteColumn", index);
  },
  deleteBlock({ commit }, cardId) {
    commit("deleteBlock", cardId);
  },
  editTitleCard({ commit }, object) {
    commit("editTitleCard", object);
  }
};

const mutations = {
  setDataProject(state, dataProjectBoard) {
    state.dataProject = dataProjectBoard;
  },
  updateBlock(state, card) {
    state.dataProject.board.blocks.find(b => b.id === Number(card.id)).status =
      card.status;
  },
  addColumn(state, title) {
    let columnList = state.dataProject.board.stages;
    columnList.splice(columnList.length - 1, 1, title, "");
  },
  addBlock(state, cardData) {
    let cardList = state.dataProject.board.blocks;
    cardList.push(cardData);
  },
  deleteBlock(state, result) {
    var index = state.dataProject.board.blocks.findIndex(
      x => x.id === result.id
    );
    return state.dataProject.board.blocks.splice(index, 1);
  },
  editColumnTitle(state, stage) {
    let stageList = state.dataProject.board.stages;
    let result = (state.dataProject.board.blocks.find(
      b => b.id === Number([stage.index])
    ).status = stage.title);
    return (stageList[stage.index] = result);
  },
  deleteColumn(state, index) {
    return state.dataProject.board.stages.splice(index, 1);
  },
  editTitleCard(state, object) {
    var index = state.dataProject.board.blocks.findIndex(
      x => x.id === object.id
    );
    return state.dataProject.board.blocks.splice(index, 1, object);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
