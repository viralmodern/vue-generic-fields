import api from "../../api/project.exhibits";

const state = {
  loading: false,
  dataHistories: [],
  dataComment: [],
  dataSectionExhibits: [],
  dataSpreadsheet: [],
  exhibitsAvailableMentions: [],
  exhibitsName: null,
  dataTableDocument: [],
  selectedSectionId: null,
  spreadsheetId: null,
  saving: false
};

const getters = {
  dataHistories: state => state.dataHistories,
  loading: state => state.loading,
  dataComment: state => state.dataComment,
  exhibitsAvailableMentions: state => state.exhibitsAvailableMentions,
  dataSectionExhibits: state => state.dataSectionExhibits,
  dataSpreadsheet: state => state.dataSpreadsheet,
  spreadsheetId: state => state.spreadsheetId,
  exhibitsName: state => state.exhibitsName,
  dataTableDocument: state => state.dataTableDocument,
  selectedSection: state => {
    return state.dataSectionExhibits
      .map(x => x.list)
      .reduce((a, b) => a.concat(b), [])
      .filter(x => x.id === state.selectedSectionId)[0];
  },
  sectionContent: (_, getters) => {
    if (getters.selectedSection) {
      return getters.selectedSection.content;
    }
    return "";
  },
  selectSpreadsheet: state => {
    return state.dataSpreadsheet
      .map(x => x)
      .reduce((a, b) => a.concat(b), [])
      .filter(x => x.id === state.spreadsheetId)[0];
  },
  spreadsheetContent: (_, getters) => {
    if (getters.selectSpreadsheet) {
      return getters.selectSpreadsheet.objectSpreadsheet;
    }
    return "";
  },
  saving: state => state.saving
};

const actions = {
  async getListHistoryExhibitsRequest({ commit }) {
    commit("setLoading", true);
    commit("getListHistoryExhibits", await api.getDataHistoryExhibits());
    commit("setLoading", false);
  },
  async getDataCommentExhibitsRequest({ commit }) {
    commit("getListCommentExhibits", await api.getDataCommentExhibits());
  },
  async getExhibitsAvailableMentionsRequest({ commit }, notebookId) {
    commit(
      "populateExhibitsAvailableMentions",
      await api.getExhibitsAvailableMentions(notebookId)
    );
  },
  async addSubSectionExhibitsRequest({ commit }, { name, parentId }) {
    const addResult = await api.addSubSectionExhibits(name, parentId);
    commit("addSubSectionExhibitsSuccess", addResult);
    return addResult;
  },
  async getDataSectionExhibitsRequest({ commit }) {
    commit("setLoading", true);
    commit("getSectionExhibitsSuccess", await api.getDataSectionExhibits());
    commit("setLoading", false);
  },
  async getDataSpreadsheetRequest({ commit }) {
    commit("getDataSpreadsheetSuccess", await api.getDataSpreadsheet());
  },
  async saveCurrentSection({ commit, state }) {
    commit("startSaving");
    const selected = state.dataSectionExhibits
      .map(x => x.list)
      .reduce((a, b) => a.concat(b), [])
      .filter(x => x.id === state.selectedSectionId)[0];
    const saveResult = await api.saveSectionContent(selected);
    commit("finishSaving");
    return saveResult;
  },
  startSaving(state) {
    state.saving = true;
  },
  finishSaving(state) {
    state.saving = false;
  }
};

// mutations
const mutations = {
  getListHistoryExhibits(state, data) {
    state.dataHistories = data.dataHistory;
  },
  setLoading(state, status) {
    state.loading = status;
  },
  getListCommentExhibits(state, data) {
    state.dataComment = data.dataComment;
  },
  populateExhibitsAvailableMentions(state, mentions) {
    state.exhibitsAvailableMentions = mentions;
  },
  getSectionExhibitsSuccess(state, data) {
    state.dataSectionExhibits = data;
    state.exhibitsName = data.name;
  },
  getDataSpreadsheetSuccess(state, data) {
    state.dataSpreadsheet = data;
  },
  addSubSectionExhibitsSuccess(state, data) {
    let newItem = data.newItem;
    let parentId = data.parentId;
    const parent = state.dataSectionExhibits.filter(x => x.id === parentId)[0];
    if (parent) {
      parent.list.push(newItem);
    }
  },
  getDataTableDocumentSuccess(state, dataTableDocument) {
    state.dataTableDocument = dataTableDocument;
  },
  changeSection(state, sectionId) {
    state.selectedSectionId = parseInt(sectionId);
  },
  changeSpreadsheet(state, sectionId) {
    state.spreadsheetId = parseInt(sectionId);
  },
  updateSectionContent(state, content) {
    const selected = state.dataSectionExhibits
      .map(x => x.list)
      .reduce((a, b) => a.concat(b), [])
      .filter(x => x.id === state.selectedSectionId)[0];
    if (selected) {
      selected.content = content;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
