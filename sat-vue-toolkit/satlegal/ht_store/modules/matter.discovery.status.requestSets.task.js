import api from "../../api/matter.discovery.status.requestSets.task";
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
  dataRequestTask: {}
};
const getters = {
  dataRequestTask: state => state.dataRequestTask,
  tasksInStatus: (state, _, __, rootGetters) => {
    const { taskStatus } = rootGetters["ht_store/workspace/appConfigs/appConfigs"];
    const stages = [];
    for (var key in state.dataRequestTask) {
      stages.push(state.dataRequestTask[key]);
    }
    return stages.map(x => ({
      id: x.id,
      name: taskStatus.find(x1 => x1.value === x.id).name,
      tasks: x.list
    }));
  }
};

const actions = {
  async getDataRequestTaskRequest({ commit }, data = {}) {
    const result = await api.getDataRequestTask(data);
    commit("getDataRequestTask", result);
    return result;
  },
  async addRequestTaskRequest({ commit }, data = {}) {
    const result = await api.addRequestTask(data);
    commit("addRequestTask", {name: data.name, result});
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
  addRequestTask(state, {name, result}) {
    state.dataRequestTask[name].list.push(result);
    state.dataRequestTask[name].totals++;
  },
  updateRequestTask(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataRequestTask[drag.fromListId].list;
      if (drag.toListId) {
        const toStage = state.dataRequestTask[drag.toListId].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataRequestTask[drag.fromListId].totals--;
        state.dataRequestTask[drag.toListId].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataRequestTask[name].list = state.dataRequestTask[name].list.map(
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
    state.dataRequestTask[name].list = state.dataRequestTask[name].list.filter(
      x => x.id !== requestTaskId
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
  mutations
};
