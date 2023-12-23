import api from "../../api/matter.discovery.status.request-item";
import attachment from "./matter.discovery.status.requestItem.attachment";
import note from "./matter.discovery.status.requestItem.note";
import {$$STORE_PREFIX} from "../../utils";

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
  dataRequestItem: {}
};
const getters = {
  dataRequestItem: state => state.dataRequestItem,
  tasksInPriority: (state, _, __, rootGetters) => {
    const { listPriority } = rootGetters["ht_store/workspace/appConfigs/appConfigs"];
    const stages = [];
    for (var key in state.dataRequestItem) {
      stages.push(state.dataRequestItem[key]);
    }
    return stages.map(x => ({
      id: x.id,
      name: listPriority.find(x1 => x1.value === x.id).name,
      tasks: x.list
    }));
  },
  tasksInResponseStatus: (state, _, __, rootGetters) => {
    const { responseStatus } = rootGetters["ht_store/workspace/appConfigs/appConfigs"];
    const stages = [];
    for (var key in state.dataRequestItem) {
      stages.push(state.dataRequestItem[key]);
    }
    return stages.map(x => ({
      id: x.id,
      name: responseStatus.find(x1 => x1.value === x.id).name,
      tasks: x.list
    }));
  },
  tasksInRequestStatus: (state, _, __, rootGetters) => {
    const { requestStatus } = rootGetters["ht_store/workspace/appConfigs/appConfigs"];
    const stages = [];
    for (var key in state.dataRequestItem) {
      stages.push(state.dataRequestItem[key]);
    }
    return stages.map(x => ({
      id: x.id,
      name: requestStatus.find(x1 => x1.value === x.id).name,
      tasks: x.list
    }));
  }
};

const actions = {
  async getDataRequestItemRequest({ commit }, data = {}) {
    const result = await api.getDataRequestItem(data);
    commit("getDataRequestItem", result);
    return result;
  },
  async addRequestItemRequest({ commit }, data = {}) {
    const result = await api.addRequestItem(data);
    commit("addRequestItem", { name: data.name, result });
    return result;
  },
  async updateRequestItemRequest({ commit }, data) {
    api.updateRequestItem(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.requestItemId, ...data.body }
    };
    commit("updateRequestItem", map);
  },
  async removeRequestItemRequest({ commit }, data) {
    api.removeRequestItem(data);
    commit("removeRequestItem", {
      name: data.name,
      requestItemId: data.requestItemId
    });
  }
};

const mutations = {
  getDataRequestItem(state, result) {
    state.dataRequestItem = { ...state.dataRequestItem, ...result };
  },
  addRequestItem(state, { name, result }) {
    state.dataRequestItem[name].list.push(result);
    state.dataRequestItem[name].totals++;
  },
  updateRequestItem(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataRequestItem[drag.fromListId].list;
      if (drag.toListId && drag.fromListId !== drag.toListId) {
        const toStage = state.dataRequestItem[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataRequestItem[drag.fromListId].totals--;
        state.dataRequestItem[drag.toListId].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataRequestItem[name].list = state.dataRequestItem[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removeRequestItem(state, { name, requestItemId }) {
    state.dataRequestItem[name].list = state.dataRequestItem[name].list.filter(
      x => x.id !== requestItemId
    );
    state.dataRequestItem[name].totals--;
  },
  cleanUpPageData(state) {
    state.dataRequestItem = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    attachment,
    note
  }
};
