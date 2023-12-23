import api from "../../api/matter.discovery.toolbox";
import tag from "./matter.discovery.toolbox.tag";
import detail from "./matter.discovery.toolbox.detail";

const state = {
  dataToolbox: [],
  filterToolbox: {},
  total: 0,
};
const getters = {
  dataToolbox: state => {
    const ToolboxMap = state.dataToolbox.map(x => ({
      id: x.pk,
      name: x.name,
      creator: x.creator,
      description: x.desc,
      created_at: x.created,
      characters: [20,22],
      type:x.type,
      tags: [1,2]
    }))
    const filter = Object.keys(state.filterToolbox);
    if (filter.length > 0) {
      let cloneDataToolbox = ToolboxMap.slice();
      let { filterToolbox } = state;
      filter.forEach(key => {
        if (Array.isArray(filterToolbox[key])) {
          cloneDataToolbox = cloneDataToolbox.filter(x =>
            filterToolbox[key].includes(x[key])
          );
        } else {
          cloneDataToolbox = cloneDataToolbox.filter(
            x => x[key] === filterToolbox[key]
          );
        }
      });
      return cloneDataToolbox;
    }
    return ToolboxMap;
  },
  hasFilter() {
    return Object.keys(state.filterToolbox).length > 0;
  },
  showShowMore: state => state.total > state.dataToolbox.length ,
};

const actions = {
  async getDataToolboxRequest({ commit }, toolbox) {
    const result = await api.getDataToolbox(toolbox);
    commit("getDataToolbox", result);
    return result;
  },
  async addDataToolboxRequest({ commit }, data) {
    const result = await api.addDataToolbox(data);
    commit("addDataToolbox", result);
    return result;
  },
  filterToolboxRequest({ commit }, filter) {
    commit("filterToolbox", filter);
  }
};

const mutations = {
  getDataToolbox(state, data) {
    state.dataToolbox = state.dataToolbox.concat(data.results);
    state.total = data.count;
  },
  addDataToolbox(state, data) {
    state.dataToolbox.unshift(data);
  },
  filterToolbox(state, { name, value }) {
    state.filterToolbox = JSON.parse(
      JSON.stringify({ ...state.filterToolbox, [name]: value })
    );
  },
  cleanUpPageData(state) {
    state.dataToolbox = [];
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
    detail
  }
};
