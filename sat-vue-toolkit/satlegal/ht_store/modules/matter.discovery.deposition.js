import api from "../../api/matter.discovery.deposition";
import proceeding from "./matter.discovery.deposition.proceeding";
import checklist from "./matter.discovery.deposition.checklist";
import uploadFiles from "./matter.discovery.deposition.uploadFiles";
import index from "./matter.discovery.deposition.index";
import preparation from "./matter.discovery.deposition.preparation";
import source from "./matter.discovery.deposition.source";
import detail from "./matter.discovery.deposition.detail";
import questionStatus from "./matter.discovery.deposition.questionStatus"; // dùng tạm để dùng chung module với proceeding
import postDeposition from "./matter.discovery.deposition.postDeposition";

const state = {
  dataDeposition: [],
  filterDeposition: {},
  total: 0
};
const getters = {
  dataDeposition: state => state.dataDeposition,
  hasFilter() {
    return Object.keys(state.filterDeposition).length > 0;
  },
  showShowMore: state => state.total > state.dataDeposition.length,
  filterDeposition: state => state.filterDeposition,
};

const actions = {
  async getDataDepositionRequest({ commit }, deposition) {
    const result = await api.getDataDeposition(deposition);
    commit("getDataDeposition", { ...result, isConcat: true});
    return result;
  },
  async addDataDepositionRequest({ commit }, data) {
    const result = await api.addDataDeposition(data);
    commit("addDataDeposition", result);
    return result;
  },
  async filterDepositionRequest({ commit }, filter) {
    const result = await api.getDataDeposition(filter);
    commit("getDataDeposition", { ...result, isConcat: false});
    return result;
  }
};

const mutations = {
  getDataDeposition(state, data) {
    const result = data.isConcat ? state.dataDeposition.concat(data.results) : data.results;
    state.dataDeposition = result;
    state.total = data.count;
  },
  addDataDeposition(state, data) {
    state.dataDeposition.push(data);
  },
  filterDeposition(state, { name, value }) {
    state.filterDeposition = JSON.parse(
      JSON.stringify({ ...state.filterDeposition, [name]: value })
    );
  },
  cleanUpPageData(state) {
    state.dataDeposition = [];
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
    checklist,
    proceeding,
    preparation,
    source,
    uploadFiles,
    detail,
    questionStatus,
    index,
    postDeposition
  }
};
