import api from "../../api/matter.discovery.log";
import tag from "./matter.discovery.log.tag";
import detail from "./matter.discovery.log.detail";
import attachment from "./matter.discovery.log.attachment";
const state = {
  logs: [],
  type: {},
  total: 0
};
const getters = {
  logs: state => {
    const dataLogMap = state.logs.map(x => ({
      id: x.pk,
      name: x.name,
      type: x.type,
      endDate: "2019-05-01",
      endTime: "21:50",
      startDate: "2019-05-07",
      startTime: "10:55",
      creator: x.creator,
      members: [1, 2],
      tags: [1, 3],
      created_at: "2019-02-17T17:10:10.000Z",
      description: x.desc
    }));
    if (state.type.type === "type") {
      return state.type.value !== 0
        ? dataLogMap.filter(x => x.type === state.type.value)
        : dataLogMap;
    }
    if (state.type.type === "name") {
      return dataLogMap.filter(x => x.name.indexOf(state.type.value) !== -1);
    }
    if (state.type.type === "creator") {
      return dataLogMap.filter(x => x.creator === state.type.value);
    }
    return dataLogMap;
  },
  showShowMore: state => state.total > state.logs.length,
};

const actions = {
  async getDataDiscoveryLogRequest({ commit }, {page, matterId}) {
    const result = await api.getDataLog({page, matterId});
    commit("getDataDiscoveryLog", result);
    return result;
  },
  async addDataDiscoveryLogRequest({ commit }, data) {
    const result = await api.addDataLog(data);
    commit("addNewLog", result);
    return result
  },
  async getDataLogFilterRequest({ commit }, data) {
    commit("getDataLogFilter", data);
  },

};

const mutations = {
  getDataDiscoveryLog(state, data) {
    state.logs = state.logs.concat(data.results);
    state.total = data.count;
  },
  addNewLog(state, data) {
    state.logs.unshift(data);
  },
  getDataLogFilter(state, data) {
    state.type = data;
  },
  cleanUpPageData(state) {
    state.logs = [];
    state.total = 0;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    tag,
    detail,
    attachment
  }
};
