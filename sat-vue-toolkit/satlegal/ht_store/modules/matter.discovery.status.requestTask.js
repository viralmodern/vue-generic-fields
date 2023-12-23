import api from "../../api/matter.discovery.status.requestTask";
import detail from "./matter.discovery.status.requestTask.detail";
import curentExpence from "./matter.discovery.status.requestTask.curentExpence";
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
  dataRequestTask: {},
};
const getters = {
  dataRequestTask: state => state.dataRequestTask,
  tasksInStatus: (state, _, __, rootGetters) => {
    const { itemStatus } = rootGetters["ht_store/workspace/appConfigs/appConfigs"];
    const stages = [];
    for (var key in state.dataRequestTask) {
      stages.push(state.dataRequestTask[key]);
    }
    const response =  stages.map((x, key) => ({
      id: key + 1,
      name: itemStatus.find(x1 => x1.id === key+1).name,
      tasks: x.results.map(x => ({...x, id: x.pk}))
    }));
    return response;
  }
};

const actions = {
  async getDataRequestTaskRequest({ commit }, data) {
    const result = await api.getDataRequestTask(data);
    commit("getDataRequestTask", result);
    return result;
  },
  async addRequestTaskRequest({ commit }, data = {}) {
    const result = await api.addRequestTask(data);
    commit("addRequestTask", { key: data.key, result });
    return result;
  },
  async updateRequestTaskRequest({ commit }, data) {
    api.updateRequestTask(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.requestTaskId, ...data.body }
    };
    commit("updateRequestTask", map);
  },
  async updateRequestTaskGroupRequest({ commit }, data) {
    api.updateRequestTask(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.requestTaskId, ...data.body }
    };
    commit("updateRequestTaskGroup", map);
  },
  async removeRequestTaskRequest({ commit }, data) {
    api.removeRequestTask(data);
    commit("removeRequestTask", {
      name: data.name,
      requestTaskId: data.requestTaskId
    });
  }
};

const mutations = {
  getDataRequestTask(state, result) {
    state.dataRequestTask = { ...state.dataRequestTask, ...result };
  },
  addRequestTask(state, { key, result }) {
    state.dataRequestTask[key].results.push(result);
    state.dataRequestTask[key].totals++;
  },
  updateRequestTask(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataRequestTask[drag.keyNameFromList].results;
      if (drag.toListId) {
        const toStage = state.dataRequestTask[drag.keyNameToList].results;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataRequestTask[drag.keyNameFromList].totals--;
        state.dataRequestTask[drag.keyNameToList].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataRequestTask[name].results = state.dataRequestTask[name].results.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removeRequestTask(state, { name, requestTaskId }) {
    state.dataRequestTask[name].results = state.dataRequestTask[name].results.filter(
      x => x.pk !== requestTaskId
    );
    state.dataRequestTask[name].totals--;
  },
  clearData(state) {
    state.dataRequestTask = {};
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
    curentExpence
  }
};
