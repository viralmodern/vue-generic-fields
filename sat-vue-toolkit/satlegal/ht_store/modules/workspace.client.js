import api from "../../api/workspace.client";
import detail from "./workspace.client.detail";
import message from "./chat-message-client";
import filters from "./client.filtes";
import {$$STORE_PREFIX} from "../../utils";

const state = {
  dataClient: []
};

const getters = {
  dataClient: (state, rootState, getter, rootGetters) => {
    const filters = rootGetters["ht_store/workspace/client/filters/activeFilters"];
    let tasks = state.dataClient && state.dataClient.slice();
    filters.forEach(filter => {
      switch (filter.name) {
        case "matter":
          if (!filter.value) return;
          var matterId = filter.value.map(i => i.id);
          tasks = tasks.filter(e => {
            return matterId.includes(e.user.matter);
          });
          break;
        case "assignee":
          if (!filter.value) return;
          var assigneeId = filter.value.map(i => i.id);
          tasks = tasks.reduce((sum, task) => {
            var check = task.user.assignee.filter(assignee =>
              assigneeId.find(id => id === assignee)
            );
            if (check.length !== 0) {
              sum = [...sum, task];
            }
            return sum;
          }, []);
          break;
      }
    });
    return tasks;
  }
};

const actions = {
  async getDataClientRequest({ commit }) {
    const result = await api.getDataClient();
    commit("getDataClient", result);
    return result;
  },
  async updateDataClientRequest({ commit }, data) {
    const result = await api.updateDataClient(data);
    commit("updateDataClient", result);
    return result;
  },
  async updateTask({ commit }, data) {
    commit("updateTaskSuccess", data);
  },
  async createNewClient({ commit }, newClient) {
    commit("createNewClient", newClient, await api.createNewClient(newClient));
  }
};

const mutations = {
  getDataClient(state, data) {
    state.dataClient = data;
  },
  updateDataClient(state, data) {
    state.dataClient = state.dataClient.map(x => {
      if (x.id === data.id) {
        delete data.id;
        return { ...x, user: { ...x.user, ...data } };
      }
      return x;
    });
  },
  createNewClient(state, newClient) {
    state.dataClient = [...state.dataClient, newClient];
  },
  updateTaskSuccess(state, data) {
    const task = state.dataClient.find(x => x.id === data.taskId);
    switch (data.columnName) {
      case "clientname":
        task.name = data.newValue;
        break;
      case "accounttype":
        task.type = data.newValue;
        break;
      case "status":
        task.status = data.newValue;
        break;
      case "assignee":
        var checkAssignee = task.user.assignee.some(
          x => x === data.newValue.id
        );
        if (checkAssignee) {
          task.user.assignee = task.user.assignee.filter(
            x => x !== data.newValue.id
          );
        } else {
          task.user.assignee = [...task.user.assignee, data.newValue.id];
        }
        break;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    message,
    filters,
    detail
  }
};
