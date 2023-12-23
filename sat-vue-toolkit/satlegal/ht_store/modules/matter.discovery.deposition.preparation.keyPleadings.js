import api from "../../api/matter.discovery.deposition.preparation.keyPleadings";
import { getLoadingSlickTable } from "../../utils";

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
  dataKeyPleadings: {},
  isLoadingGet: {},
};
const getters = {
  dataKeyPleadings: state => state.dataKeyPleadings,
  isLoadingGet: state => state.isLoadingGet,
};

const actions = {
  async getDataKeyPleadingsRequest({ commit }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataKeyPleadings(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    commit("getDataKeyPleadings", result);
    return result;
  },
  async addKeyPleadingsRequest({ commit }, data = {}) {
    const result = await api.addKeyPleadings(data);
    commit("addKeyPleadings", { name: data.name, result });
    return result;
  },
  async updateKeyPleadingsRequest({ commit }, data) {
    api.updateKeyPleadings(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.keyPleadingsId, ...data.body }
    };
    commit("updateKeyPleadings", map);
  },
  async updateKeyPleadingsGroupRequest({ commit }, data) {
    api.updateKeyPleadings(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.keyPleadingsId, ...data.body }
    };
    commit("updateKeyPleadingsGroup", map);
  },
  async removeKeyPleadingsRequest({ commit }, data) {
    const result = await api.removeKeyPleadings(data);
    commit("removeKeyPleadings", data);
    return result;
  }
};

const mutations = {
  getDataKeyPleadings(state, data) {
    state.dataKeyPleadings = {...state.dataKeyPleadings, ...data};
  },
  addKeyPleadings(state, { name, result }) {
    state.dataKeyPleadings[name].list.push(result);
    state.dataKeyPleadings[name].totals++;
  },
  updateKeyPleadings(state, { drag, result }) {
    if (drag) {
      const fromStage = state.dataKeyPleadings[drag.fromListId].list;
      if (drag.toListId) {
        const toStage = state.dataKeyPleadings[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataKeyPleadings[drag.fromListId].totals--;
        state.dataKeyPleadings[drag.toListId].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      for (const key in state.dataKeyPleadings) {
        state.dataKeyPleadings[key].list = state.dataKeyPleadings[key].list.map(x => {
          if(x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        })
      }
    }
  },
  removeKeyPleadings(state, { name, isFieldArray, keyPleadingsId }) {
    if (isFieldArray) {
      for (var key in state.dataKeyPleadings) {
        state.dataKeyPleadings[key].list = state.dataKeyPleadings[
          key
        ].list.filter(x => x.id !== keyPleadingsId);
        state.dataKeyPleadings[key].totals--;
      }
    } else {
      state.dataKeyPleadings[name].list = state.dataKeyPleadings[
        name
      ].list.filter(x => x.id !== keyPleadingsId);
      state.dataKeyPleadings[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  clearData(state) {
    state.dataKeyPleadings = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
