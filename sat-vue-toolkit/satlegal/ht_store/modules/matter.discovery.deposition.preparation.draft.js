import api from "../../api/matter.discovery.deposition.preparation.draft";

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
  dataDraft: {}
};
const getters = {
  dataDraft: state => state.dataDraft
};

const actions = {
  async getDataDraftRequest({ commit }, data = {}) {
    const result = await api.getDataDraft(data);
    commit("getDataDraft", { stage: data.stage, ...result });
    return result;
  },
  async addDraftRequest({ commit }, data = {}) {
    const result = await api.addDraft(data);
    commit("addDraft", {name: data.name, result});
    return result;
  },
  async updateDraftRequest({ commit }, data) {
    api.updateDraft(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.draftId, ...data.body }
    };
    commit("updateDraft", map);
  },
  async updateDraftGroupRequest({ commit }, data) {
    api.updateDraft(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.draftId, ...data.body }
    };
    commit("updateDraftGroup", map);
  },
  async removeDraftRequest({ commit }, data) {
    api.removeDraft(data);
    commit("removeDraft", {
      name: data.name,
      draftId: data.draftId
    });
  }
};

const mutations = {
  getDataDraft(state, { stage, results, count }) {
    state.dataDraft = {
      ...state.dataDraft,
      [stage.name]: {
        id: stage.value,
        name: stage.name,
        list: results,
        totals: count
      }
    };
  },
  addDraft(state, {name, result}) {
    state.dataDraft[name].list.push(result);
    state.dataDraft[name].totals++;
  },
  updateDraft(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataDraft[drag.fromListName].list;
      if (drag.toListName) {
        const toStage = state.dataDraft[drag.toListName].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataDraft[drag.fromListName].totals--;
        state.dataDraft[drag.toListName].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataDraft[name].list = state.dataDraft[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removeDraft(state, { name, draftId }) {
    state.dataDraft[name].list = state.dataDraft[name].list.filter(
      x => x.id !== draftId
    );
    state.dataDraft[name].totals--;
  },
  clearData(state) {
    state.dataDraft = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

