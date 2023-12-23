import api from "../../api/matter.discovery.status.requestSets";
import attachment from "./matter.discovery.status.requestSets.Attachment";
import notes from "./matter.discovery.status.requestSets.notes";
import detail from "./matter.discovery.status.requestSets.detail";
import comments from "./matter.discovery.status.requestSets.comment";
import requestItem from "./matter.discovery.status.requestSets.request-item";
import instruction from "./matter.discovery.status.requestSets.instruction";
import definition from "./matter.discovery.status.requestSets.definition";
import task from "./matter.discovery.status.requestSets.task";

const state = {
  dataCAFDiscovery: [],
  totals: 0,
  isLoading: false
}

const getters = {
  dataCAFDiscovery: state => {
    return state.dataCAFDiscovery.map(x => {
      return {
        ...x,
        id: x.pk
      }
    })
  },
  totals: state => state.totals,
  isLoading: state => state.isLoading
}

const actions = {
  async getDataCAFDiscovery({ commit }, paging) {
    commit("setLoading", true);
    const result = await api.getDataCAFDiscovery(paging);
    commit("getDataCAFDiscovery", result);
    commit("setLoading", false);
    return result;
  },
  async updateRequest({ commit }, request) {
    commit("updateRequest", request, await api.updateRequest(request));
  },
  async removeRequestSet({ commit }, request) {
    commit("setLoading", true);
    commit("removeRequestSet", request, await api.removeRequestSet(request));
    commit("setLoading", false);
  },
  async createRequestSet({ commit }, bodyRequest) {
    commit("setLoading", true);
    commit("createRequestSet", await api.createRequestSet(bodyRequest));
    commit("setLoading", false);
  }
}

const mutations = {
  setLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  getDataCAFDiscovery(state, data) {
    state.dataCAFDiscovery = data.results;
    state.totals = data.count;
  },
  createRequestSet(state, bodyRequest) {
    state.dataCAFDiscovery = [...state.dataCAFDiscovery, bodyRequest]
  },
  updateRequest(state, data) {
    const task = state.dataCAFDiscovery.find(x => x.pk === data.rowId);
    switch (data.columnName) {
      case "name":
        task.name = data.newValue;
        break;
      case "members":
        task.members = data.newValue;
        break;
      case "priority":
        task.priority = data.newValue;
        break;
    }
    return task;
  },
  removeRequestSet(state, request) {
    state.dataCAFDiscovery = state.dataCAFDiscovery.filter(x => x.pk !== request.id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    attachment,
    detail,
    notes,
    comments,
    requestItem,
    instruction,
    definition,
    task
  }
}
