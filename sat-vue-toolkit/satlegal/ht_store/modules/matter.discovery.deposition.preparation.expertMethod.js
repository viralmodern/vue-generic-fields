import api from "../../api/matter.discovery.deposition.preparation.expertMethod";
import peerReviewProof from "./matter.discovery.deposition.preparation.expertMethod.peerReviewProof";

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
  dataExpertMethod: {}
};
const getters = {
  dataExpertMethod: state => state.dataExpertMethod
};

const actions = {
  async getDataExpertMethodRequest({ commit }, data = {}) {
    const result = await api.getDataExpertMethod(data);
    commit("getDataExpertMethod", { stage: data.stage, ...result });
    return result;
  },
  async addExpertMethodRequest({ commit }, data = {}) {
    const result = await api.addExpertMethod(data);
    commit("addExpertMethod", {name: data.name, result});
    return result;
  },
  async updateExpertMethodRequest({ commit }, data) {
    api.updateExpertMethod(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.expertMethodId, ...data.body }
    };
    commit("updateExpertMethod", map);
  },
  async updateExpertMethodGroupRequest({ commit }, data) {
    api.updateExpertMethod(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.expertMethodId, ...data.body }
    };
    commit("updateExpertMethodGroup", map);
  },
  async removeExpertMethodRequest({ commit }, data) {
    api.removeExpertMethod(data);
    commit("removeExpertMethod", {
      name: data.name,
      expertMethodId: data.expertMethodId
    });
  }
};

const mutations = {
  getDataExpertMethod(state, { stage, results, count }) {
    state.dataExpertMethod = {
      ...state.dataExpertMethod,
      [stage.name]: {
        id: stage.value,
        name: stage.name,
        list: results,
        totals: count
      }
    };
  },
  addExpertMethod(state, {name, result}) {
    state.dataExpertMethod[name].list.push(result);
    state.dataExpertMethod[name].totals++;
  },
  updateExpertMethod(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataExpertMethod[drag.fromListName].list;
      if (drag.toListName) {
        const toStage = state.dataExpertMethod[drag.toListName].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataExpertMethod[drag.fromListName].totals--;
        state.dataExpertMethod[drag.toListName].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataExpertMethod[name].list = state.dataExpertMethod[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removeExpertMethod(state, { name, expertMethodId }) {
    state.dataExpertMethod[name].list = state.dataExpertMethod[name].list.filter(
      x => x.id !== expertMethodId
    );
    state.dataExpertMethod[name].totals--;
  },
  clearData(state) {
    state.dataExpertMethod = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    peerReviewProof
  }
};

