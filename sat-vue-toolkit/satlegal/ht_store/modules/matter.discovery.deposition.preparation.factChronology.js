import api from "../../api/matter.discovery.deposition.preparation.factChronology";

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
  dataFactChronology: {}
};
const getters = {
  dataFactChronology: state => state.dataFactChronology
};

const actions = {
  async getDataFactChronologyRequest({ commit }, data = {}) {
    const result = await api.getDataFactChronology(data);
    commit("getDataFactChronology", { stage: data.stage, ...result });
    return result;
  },
  async addFactChronologyRequest({ commit }, data = {}) {
    const result = await api.addFactChronology(data);
    commit("addFactChronology", {name: data.name, result});
    return result;
  },
  async updateFactChronologyRequest({ commit }, data) {
    api.updateFactChronology(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.factChronologyId, ...data.body }
    };
    commit("updateFactChronology", map);
  },
  async updateFactChronologyGroupRequest({ commit }, data) {
    api.updateFactChronology(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.factChronologyId, ...data.body }
    };
    commit("updateFactChronologyGroup", map);
  },
  async removeFactChronologyRequest({ commit }, data) {
    api.removeFactChronology(data);
    commit("removeFactChronology", data);
  }
};

const mutations = {
  getDataFactChronology(state, { stage, results, count }) {
    state.dataFactChronology = {
      ...state.dataFactChronology,
      [stage.name]: {
        id: stage.value,
        name: stage.name,
        list: results,
        totals: count
      }
    };
  },
  addFactChronology(state, {name, result}) {
    state.dataFactChronology[name].list.push(result);
    state.dataFactChronology[name].totals++;
  },
  updateFactChronology(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataFactChronology[drag.fromListName].list;
      if (drag.toListName) {
        const toStage = state.dataFactChronology[drag.toListName].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataFactChronology[drag.fromListName].totals--;
        state.dataFactChronology[drag.toListName].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataFactChronology[name].list = state.dataFactChronology[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removeFactChronology(state, { name, factChronologyId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataFactChronology) {
        state.dataFactChronology[key].list = state.dataFactChronology[
          key
        ].list.filter(x => x.id !== factChronologyId);
        state.dataFactChronology[key].totals--;
      }
    } else {
      state.dataFactChronology[name].list = state.dataFactChronology[
        name
      ].list.filter(x => x.id !== factChronologyId);
      state.dataFactChronology[name].totals--;
    }
  },
  clearData(state) {
    state.dataFactChronology = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

