import api from "../../api/matter.discovery.deposition.questionStatus";

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

const state = {
  dataQuestionStatus: []
};
const getters = {
  dataQuestionStatus: state => state.dataQuestionStatus
};

const actions = {
  async getDataQuestionStatusRequest({ commit }, data = {}) {
    const result = await api.getDataQuestionStatus(data);
    commit("getDataQuestionStatus", result);
    return result;
  },
  async addQuestionStatusRequest({ commit }, data = {}) {
    const result = await api.addQuestionStatus(data);
    commit("addQuestionStatus", { name: data.name, result });
    return result;
  },
  async updateQuestionStatusRequest({ commit }, data) {
    api.updateQuestionStatus(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.questionStatusId, ...data.body }
    };
    commit("updateQuestionStatus", map);
  },
  async removeQuestionStatusRequest({ commit }, data) {
    api.removeQuestionStatus(data);
    commit("removeQuestionStatus", {
      name: data.name,
      questionStatusId: data.questionStatusId
    });
  }
};

const mutations = {
  getDataQuestionStatus(state, result) {
    state.dataQuestionStatus = { ...state.dataQuestionStatus, ...result };
  },
  addQuestionStatus(state, { name, result }) {
    state.dataQuestionStatus[name].list.push(result);
    state.dataQuestionStatus[name].totals++;
  },
  updateQuestionStatus(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataQuestionStatus[drag.fromListId].list;
      if (drag.toListId && drag.fromListId !== drag.toListId) {
        const toStage = state.dataQuestionStatus[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataQuestionStatus[drag.fromListId].totals--;
        state.dataQuestionStatus[drag.toListId].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataQuestionStatus[name].list = state.dataQuestionStatus[
        name
      ].list.map(x => {
        if (x.id === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeQuestionStatus(state, { name, questionStatusId }) {
    state.dataQuestionStatus[name].list = state.dataQuestionStatus[
      name
    ].list.filter(x => x.id !== questionStatusId);
    state.dataQuestionStatus[name].totals--;
  },
  cleanUpPageData(state) {
    state.dataQuestionStatus = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
