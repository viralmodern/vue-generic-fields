import api from "../../api/matter.discovery.deposition.preparation.testimony";

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
  dataTestimony: {}
};
const getters = {
  dataTestimony: state => state.dataTestimony
};

const actions = {
  async getDataTestimonyRequest({ commit }, data = {}) {
    const result = await api.getDataTestimony(data);
    commit("getDataTestimony", { stage: data.stage, ...result });
    return result;
  },
  async addTestimonyRequest({ commit }, data = {}) {
    const result = await api.addTestimony(data);
    commit("addTestimony", {name: data.name, result});
    return result;
  },
  async updateTestimonyRequest({ commit }, data) {
    api.updateTestimony(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.testimonyId, ...data.body }
    };
    commit("updateTestimony", map);
  },
  async updateTestimonyGroupRequest({ commit }, data) {
    api.updateTestimony(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.testimonyId, ...data.body }
    };
    commit("updateTestimonyGroup", map);
  },
  async removeTestimonyRequest({ commit }, data) {
    api.removeTestimony(data);
    commit("removeTestimony", {
      name: data.name,
      testimonyId: data.testimonyId
    });
  }
};

const mutations = {
  getDataTestimony(state, { stage, results, count }) {
    state.dataTestimony = {
      ...state.dataTestimony,
      [stage.name]: {
        id: stage.value,
        name: stage.name,
        list: results,
        totals: count
      }
    };
  },
  addTestimony(state, {name, result}) {
    state.dataTestimony[name].list.push(result);
    state.dataTestimony[name].totals++;
  },
  updateTestimony(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataTestimony[drag.fromListName].list;
      if (drag.toListName) {
        const toStage = state.dataTestimony[drag.toListName].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataTestimony[drag.fromListName].totals--;
        state.dataTestimony[drag.toListName].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataTestimony[name].list = state.dataTestimony[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removeTestimony(state, { name, testimonyId }) {
    state.dataTestimony[name].list = state.dataTestimony[name].list.filter(
      x => x.id !== testimonyId
    );
    state.dataTestimony[name].totals--;
  },
  clearData(state) {
    state.dataTestimony = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

