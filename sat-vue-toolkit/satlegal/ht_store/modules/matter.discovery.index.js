import api from "../../api/matter.discovery.index";
import detailIndex from "./matter.discovery.index.detail";
import {$$STORE_PREFIX} from "../../utils";

const state = {
  dataIndexDiscovery: []
}

const getters = {
  dataIndexDiscovery: (state, rootState, getter, rootGetters) => {
    const filters = rootGetters["ht_store/matter/discovery/filtersIndex/activeFilters"];
    let tasks = state.dataIndexDiscovery && state.dataIndexDiscovery.slice();
    filters.forEach(filter => {
      switch (filter.name) {
        case "creator":
          if (!filter.value) return;
          var userId = filter.value.map(i => i.id);
          tasks = tasks.filter(e => {
            return userId.includes(e.creator);
          });
          break;
        case "tag":
          if (!filter.value) return;
          var tagId = filter.value.map(i => i.id);
          tasks = tasks.reduce((sum, task) => {
            var check = task.tags.filter(x => tagId.find(id => id === x));
            if (check.length !== 0) {
              sum = [...sum, task];
            }
            return sum;
          }, []);
          break;
        case "assignee":
          if (!filter.value) return;
          var authoredById = filter.value.map(i => i.id);
          tasks = tasks.reduce((sum, task) => {
            var check = task.authoredBy.filter(authoredBy =>
              authoredById.find(id => id === authoredBy)
            );
            if (check.length !== 0) {
              sum = [...sum, task];
            }
            return sum;
          }, []);
          break;
      }
    });
    return tasks
  }
}

const actions = {
  async getDataIndexDiscovery({ commit }) {
    commit("getDataIndexDiscovery", await api.getDataIndexDiscovery())
  },
  async updateTask({ commit }, data) {
    commit("updateTaskSuccess", data)
  },
  async createItemIndex({ commit }, data) {
    commit("createItemIndex", data, await api.createItemIndex(data))
  }
}

const mutations = {
  getDataIndexDiscovery(state, dataIndexDiscovery) {
    state.dataIndexDiscovery = dataIndexDiscovery
  },
  createItemIndex(state, data) {
    state.dataIndexDiscovery = [...state.dataIndexDiscovery, data]
  },
  updateTaskSuccess(state, data) {
    const task = state.dataIndexDiscovery.find(
      x => x.id === data.taskId
    );
    switch (data.columnName) {
      case "name":
        task.name = data.newValue;
        break;
      case "providedBy":
        task.providedBy = data.newValue.id;
        break;
      case "favorable":
        task.favorable = data.newValue.id;
        break;
      case "type":
        task.type = data.newValue;
        break;
      case "tags":
        var tags = task.tags.some(x => x === data.newValue);
        if (tags) {
          task.tags = task.tags.filter(x => x !== data.newValue);
        } else {
          task.tags = [...task.tags, data.newValue];
        }
        break;
      case "authoredBy":
        var authoredBy = task.authoredBy.some(x => x === data.newValue.id);
        if (authoredBy) {
          task.authoredBy = task.authoredBy.filter(x => x !== data.newValue.id);
        } else {
          task.authoredBy = [...task.authoredBy, data.newValue.id];
        }
        break;
      case "attachment":
        if (data.type === "add") {
          task.attachment = [...task.attachment, data.newValue]
        } else if (data.type === "remove") {
          task.attachment = task.attachment.filter(x => x !== data.newValue);
        }
        break;
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    detailIndex
  }
}
