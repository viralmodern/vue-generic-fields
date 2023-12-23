import api from "../../api/matter.plaintiff";
import { acquireSource } from "../../config";
import plaintiffGroup from "./matter.plaintiff.plaintiffGroup";
import {$$STORE_PREFIX} from "../../utils";

const state = {
  dataPlaintiff: [],
  groupByKYCStatus: {},
  plaintiffGroup: {},
  groupAcquireSource: {}
}

const getters = {
  dataPlaintiff: state => state.dataPlaintiff,
  groupByKYCStatus: state => {
    return state.dataPlaintiff.reduce((x, o) => {
      x[o.kycStatus] = (x[o.kycStatus] || []).concat(o);
      return x;
    }, {})
  },
  groupAcquireSource: state => {
    return acquireSource.reduce((x, o) => {
      const group = (x[o.name] || []).concat(o);
      x[o.name] = state.dataPlaintiff.filter(x => {
        return x.acquireSource.includes(group && group[0].id)
      })
      return x;
    }, {})
  },
  plaintiffGroup: (state, rootState, getters, rootGetters) => {
    const plaintiff = rootGetters['ht_store/matter/plaintiff/plaintiffGroup/labelPlaintiff'];

    return plaintiff.reduce((x, o) => {
      const group = (x[o.name] || []).concat(o);
      x[o.name] = state.dataPlaintiff.filter(x => {
        return x.plaintiffGroup.includes(group && group[0].id)
      })
      return x;
    }, {})
  }
}

const actions = {
  async getDataPlaintiff({ commit }) {
    commit("getDataPlaintiff", await api.getDataPlaintiff())
  },
  async updateTask({ commit }, data) {
    commit("updateTask", data)
  },
  async createPlaintiffRequest({ commit }, data) {
    commit("createPlaintiff", await api.createPlaintiff(data));
  }
};

const mutations = {
  getDataPlaintiff(state, results) {
    state.dataPlaintiff = results
  },
  updateTask(state, data) {
    const task = state.dataPlaintiff.find(x => x.id === data.taskId);
    switch (data.columnName) {
      case "first_name":
        task.first_name = data.newValue;
        break;
      case "last_name":
        task.last_name = data.newValue
        break;
      case "kyc_status":
        task.kycStatus = data.newValue
        break;
      case "acquire_souce":
        var acquire = task.acquireSource.some(x => x === data.newValue.id);
        if (!acquire) {
          task.acquireSource = [...task.acquireSource, data.newValue.id];
        } else {
          task.acquireSource = task.acquireSource.filter(x => x !== data.newValue.id);
        }
        break;
      case "plaintiff_group":
        var group = task.plaintiffGroup.some(x => x === data.newValue);
        if (!group) {
          task.plaintiffGroup = [...task.plaintiffGroup, data.newValue];
        } else {
          task.plaintiffGroup = task.plaintiffGroup.filter(x => x !== data.newValue);
        }
        break;
      case "bought_At":
        task.boughtAt = data.newValue
        break;
      case "quantity":
        task.quantity = data.newValue
        break;
    }
    return task;
  },
  createPlaintiff(state, results) {
    state.dataPlaintiff.unshift(results);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    plaintiffGroup
  }
};
