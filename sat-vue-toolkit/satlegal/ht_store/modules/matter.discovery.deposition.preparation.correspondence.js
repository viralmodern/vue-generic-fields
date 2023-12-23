import api from "../../api/matter.discovery.deposition.preparation.correspondence";

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
  dataCorrespondence: {}
};
const getters = {
  dataCorrespondence: state => state.dataCorrespondence
};

const actions = {
  async getDataCorrespondenceRequest({ commit }, data = {}) {
    const result = await api.getDataCorrespondence(data);
    commit("getDataCorrespondence", { stage: data.stage, ...result });
    return result;
  },
  async addCorrespondenceRequest({ commit }, data = {}) {
    const result = await api.addCorrespondence(data);
    commit("addCorrespondence", {name: data.name, result});
    return result;
  },
  async updateCorrespondenceRequest({ commit }, data) {
    api.updateCorrespondence(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.correspondenceId, ...data.body }
    };
    commit("updateCorrespondence", map);
  },
  async updateCorrespondenceGroupRequest({ commit }, data) {
    api.updateCorrespondence(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.correspondenceId, ...data.body }
    };
    commit("updateCorrespondenceGroup", map);
  },
  async removeCorrespondenceRequest({ commit }, data) {
    api.removeCorrespondence(data);
    commit("removeCorrespondence", {
      name: data.name,
      correspondenceId: data.correspondenceId
    });
  }
};

const mutations = {
  getDataCorrespondence(state, { stage, results, count }) {
    state.dataCorrespondence = {
      ...state.dataCorrespondence,
      [stage.name]: {
        id: stage.value,
        name: stage.name,
        list: results,
        totals: count
      }
    };
  },
  addCorrespondence(state, {name, result}) {
    state.dataCorrespondence[name].list.push(result);
    state.dataCorrespondence[name].totals++;
  },
  updateCorrespondence(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataCorrespondence[drag.fromListName].list;
      if (drag.toListName) {
        const toStage = state.dataCorrespondence[drag.toListName].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataCorrespondence[drag.fromListName].totals--;
        state.dataCorrespondence[drag.toListName].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataCorrespondence[name].list = state.dataCorrespondence[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removeCorrespondence(state, { name, correspondenceId }) {
    state.dataCorrespondence[name].list = state.dataCorrespondence[name].list.filter(
      x => x.id !== correspondenceId
    );
    state.dataCorrespondence[name].totals--;
  },
  clearData(state) {
    state.dataCorrespondence = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

