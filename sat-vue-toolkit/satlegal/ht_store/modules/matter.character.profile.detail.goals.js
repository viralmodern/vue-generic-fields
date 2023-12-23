import api from "../../api/matter.character.detail.goals";
import label from "./matter.character.profile.detail.goals.label";
const state = {
  goals: []
};
const getters = {
  goals: state => state.goals
};

const actions = {
  async getDataCharacterGoalRequest({ commit }, page = 0) {
    commit("getDataCharacterGoal", await api.getDataListGoals(page));
  }
};

const mutations = {
  getDataCharacterGoal(state, data) {
    let dataPush = data.map(x => ({ ...x, id: Math.random() }));
    state.goals = state.goals.concat(dataPush);
  },
  addNewGoal(state, data) {
    state.goals.unshift(data);
  },
  changeInfor(state, data) {
    let item = state.goals.find(x => x.id === data.id);
    switch (data.nameColumn) {
      case "title":
        item.title = data.newValue;
        break;
      case "description":
        item.description = data.newValue;
        break;
      default:
        break;
    }
  },
  changeDesCriptionKey(state, data) {
    let item = state.goals.find(x => x.id === data.parentId);
    item.keyResults.forEach(x => {
      if (x.id === data.keyId) {
        x.result = data.newValue;
      }
    });
  },
  addKeyResult(state, data) {
    let item = state.goals.find(x => x.id === data.parentId);
    item.keyResults.push(data.dataPush);
  },
  changeProgressItem(state, data) {
    let item = state.goals.find(x => x.id === data.parentId).keyResults;
    item.find(x => x.id === data.id).progress = data.value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    label
  }
};
