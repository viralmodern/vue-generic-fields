import api from "../../api/task.detail";
import description from "./task.detail.description";
import comment from "./task.detail.comment";
import tags from "./task.detail.tags";
import checklist from "./task.detail.checklist";
import subtask from "./task.detail.subtask";
import notes from "./task.detail.notes";
import activities from "./task.detail.activities";
import worklog from "./task.detail.worklog";
import milestone from "./task.detail.milestone";
import labels from "./task.detail.labels";
import attachment from "./task.detail.attachment";
import citation from "./task.detail.citation";
import members from "./task.detail.member";
import location from "./task.detail.location";

const state = {
  dataFiles: [],
  dataSelect: {},
  dataPeoples: [],
  dataTags: []
};
const getters = {
  dataFiles: state => state.dataFiles,
  dataSelect: state => state.dataSelect,
  dataPeoples: state => state.dataPeoples,
  dataTags: state => state.dataTags
};

const actions = {
  async getDataFileRequest({ commit }) {
    commit("getDataFile", await api.getFiles());
  },
  async getDataSelectRequest({ commit }) {
    commit("getDataSelect", await api.getListTaskDetailSelect());
  },
  async getDataPeopleRequest({ commit }) {
    commit("getDataPeople", await api.getListPeople());
  },
  async getDataTagsRequest({ commit }) {
    commit("getDataTags", await api.getListTags());
  }
};

const mutations = {
  getDataFile(state, dataFiles) {
    state.dataFiles = dataFiles;
  },

  deleteFile(state, id) {
    state.dataFiles = state.dataFiles.filter(x => x.id !== id);
  },
  uploadFile(state, files) {
    state.dataFiles = [...state.dataFiles, ...files];
  },
  updateRateFile(state, id){
    state.dataFiles = state.dataFiles.map(x => {
      if (x.id === id) {
        return { ...x, rate: !x.rate };
      } else return x;
    });
  },
  getDataSelect(state, dataSelect) {
    state.dataSelect = dataSelect;
  },
  getDataPeople(state, dataPeoples) {
    state.dataPeoples = dataPeoples;
  },
  getDataTags(state, dataTags) {
    state.dataTags = dataTags;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    description,
    comment,
    tags,
    checklist,
    subtask,
    notes,
    activities,
    worklog,
    milestone,
    labels,
    attachment,
    citation,
    members,
    location
  }
};
