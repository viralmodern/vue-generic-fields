import api from "../../api/matter.references";
import detail from "./matter.references.detail";
import highlight from "./matter.references.highligh";

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
  dataReferences: {
  }
};
const getters = {
  dataReferences: state => state.dataReferences
};

const actions = {
  async getDataReferencesRequest({ commit }, data = {}) {
    const result = await api.getDataReferences(data);
    commit("getDataReferences", { stage: data.stage, ...result });
    return result;
  },
  async addReferencesRequest({ commit }, data = {}) {
    const result = await api.addReferences(data);
    commit("addReferences", { name: data.name, result });
    return result;
  },
  async updateReferencesRequest({ commit }, data) {
    api.updateReferences(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.referencesId, ...data.body }
    };
    commit("updateReferences", map);
  },
  async updateReferencesGroupRequest({ commit }, data) {
    api.updateReferences(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.referencesId, ...data.body }
    };
    commit("updateReferencesGroup", map);
  },
  async removeReferencesRequest({ commit }, data) {
    api.removeReferences(data);
    commit("removeReferences", {
      name: data.name,
      referencesId: data.referencesId
    });
  }
};

const mutations = {
  getDataReferences(state, { stage, results, count }) {
    state.dataReferences = {
      ...state.dataReferences,
      [stage.name]: {
        id: stage.value,
        name: stage.name,
        list: results,
        totals: count
      }
    };
  },
  addReferences(state, { name, result }) {
    state.dataReferences[name].list.push(result);
    state.dataReferences[name].totals++;
  },
  updateReferences(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataReferences[drag.fromListName].list;
      if (drag.toListName) {
        const toStage = state.dataReferences[drag.toListName].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataReferences[drag.fromListName].totals--;
        state.dataReferences[drag.toListName].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataReferences[name].list = state.dataReferences[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removeReferences(state, { name, referencesId }) {
    state.dataReferences[name].list = state.dataReferences[name].list.filter(
      x => x.id !== referencesId
    );
    state.dataReferences[name].totals--;
  },
  clearData(state) {
    state.dataReferences = {};
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
    highlight
  }
};

