import api from "../../api/matter.discovery.deposition.checklist";
import {$$STORE_PREFIX} from "../../utils";

const state = {
  dataCheckList: [],
  detailCheckList: {},
  totalPagination: 0
}

const getters = {
  dataCheckList: (state, _, __, rootGetters) => {
    const results = state.dataCheckList.map(x => {
      var users = rootGetters["ht_store/project/members/members"].find(user => user.id === x.members);
      return {
        ...x,
        users,
        isCheckbox: false,
      }
    });
    return results;
  },
  detailCheckList: (state, _, __, rootGetters) => {
    var users = rootGetters["ht_store/project/members/members"];
    var detail = state.detailCheckList
    var resp = {
      ...detail,
      users: users.find(x => x.id === detail.creator)
    }
    return resp;
  },
  totalPagination: state => state.totalPagination
}

const actions = {
  async getDataCheckList({ commit }, req) {
    commit("getDataCheckList", await api.getDataCheckList(req));
  },
  async updateCheckList({ commit }, req) {
    commit("updateCheckList", await api.updateCheckList(req));
  },
  async getDetailCheckList({ commit }, req) {
    commit("getDetailCheckList", await api.getDetailCheckList(req));
  },
  async updateLabels({ commit }, req) {
    commit("updateLabels", await api.updateLabels(req));
  },
  async createdNewTask({ commit }, req) {
    commit("createdNewTask", await api.createdNewTask(req));
  },
  async sendComment({ commit }, req) {
    commit("sendComment", await api.sendComment(req));
  },
  async updateStar({ commit }, req) {
    commit("updateStar", req, await api.updateStar(req));
  },
  async removeTask({ commit }, req) {
    commit("removeTask", req, await api.removeTask(req))
  }
}

const mutations = {
  getDataCheckList(state, results) {
    state.dataCheckList = results.resp;
    state.totalPagination = results.count;
  },
  updateCheckList(state, resp) {
    state.detailCheckList = resp;
    state.dataCheckList = state.dataCheckList.map(x => {
      if (x.pk === resp.pk) {
        return { ...x, ...resp }
      }
      return x;
    })
  },
  getDetailCheckList(state, results) {
    state.detailCheckList = results;
  },
  getDataLabels(state, dataLabels) {
    state.dataLabels = dataLabels
  },
  updateLabels(state, request) {
    return {
      state, request
    }
  },
  createdNewTask(state, results) {
    state.dataCheckList = [results, ...state.dataCheckList];
    state.totalPagination = state.totalPagination + 1;
  },
  sendComment(state, results) {
    state.detailCheckList = {
      ...state.detailCheckList,
      comments: [results, ...state.detailCheckList.comments]
    }
  },
  updateStar(state, resp) {
    state.dataCheckList = state.dataCheckList.map(x => {
      if (x.pk === resp.taskId) {
        return { ...x, starred: resp.starred }
      }
      return x;
    })
    state.detailCheckList = { ...state.detailCheckList, starred: resp.starred }
  },
  removeTask(state, resp) {
    state.detailCheckList = { ...state.detailCheckList, is_removed: resp.is_removed };
    state.dataCheckList = state.dataCheckList.map(x => {
      if (x.pk === resp.taskId) {
        return { ...x, is_removed: resp.is_removed }
      }
      return x;
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
