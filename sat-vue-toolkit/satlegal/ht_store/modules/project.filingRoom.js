import api from "../../api/filing-room";

const state = {
  dataApprovals: [],
  dataCategory: [],
  dataLifecycle: [],
  dataRequirements: [],
  dataSectionGuidlines: null,
  saving: false,
  myDataTimerTracking: {},
  dataDocument: [],
  dataMemberTimerTracking: [],
  dataTicketMessages: [],
  dataAvailableMentions: [],
  dataRelation: [],
  dataTransations: [],
  dataSectionHeadline: []
};

const getters = {
  dataApprovals: state => state.dataApprovals,
  dataCategory: state => state.dataCategory,
  dataLifecycle: state => state.dataLifecycle,
  dataRequirements: state => state.dataRequirements,
  dataSectionGuidlines: state => state.dataSectionGuidlines,
  dataDocument: state => state.dataDocument,
  saving: state => state.saving,
  dataRelation: state => state.dataRelation,
  dataTransations: state => state.dataTransations,
  myDataTimerTracking: state => state.myDataTimerTracking,
  dataMemberTimerTracking: state => state.dataMemberTimerTracking,
  dataTicketMessages: state => state.dataTicketMessages,
  dataAvailableMentions: state => state.dataAvailableMentions,
  dataSectionHeadline: state => state.dataSectionHeadline
};

const actions = {
  async getDataApprovalsRequest({ commit }) {
    commit("getDataApprovalsSuccess", await api.getDataApprovals());
  },
  async getDataCategoryRequest({ commit }) {
    commit("getDataCategorySuccess", await api.getDataCategory());
  },
  async getDataLifecycleRequest({ commit }) {
    commit("getDataLifecycleSuccess", await api.getDataLifecycle());
  },
  async getDataRequirementsRequest({ commit }) {
    commit("getDataRequirementsSuccess", await api.getDataRequirements());
  },
  async getDataTicketMessagesRequest({ commit }) {
    commit("getDataTicketMessagesSuccess", await api.getDataTicketMessages());
  },
  async getDataAvailableMentionsRequest({ commit }) {
    commit(
      "getDataAvailableMentionsSuccess",
      await api.getDataAvailableMentions()
    );
  },
  async getDataFilingDocumentRequest({ commit }) {
    commit("getDataFilingDocumentSuccess", await api.getDataFilingDocument());
  },
  async createDocumentFile({ commit }, documentFile) {
    commit("createDocumentSuccess", await api.postDocumentFile(documentFile));
  },
  async getDataRelationRequest({ commit }) {
    commit("getDataRelationSuccess", await api.getDataRelation());
  },
  async deleteRelationRequest({ commit }, data) {
    commit("deleteRelationSuccess", await api.deleteRelation(data));
  },
  async getDataTransations({ commit }) {
    commit("getDataTransationsSuccess", await api.getDataTransations());
  },
  async createDataRelations({ commit }, objectRelations) {
    commit(
      "createDataRelationsSuccess",
      await api.postDataRelations(objectRelations)
    );
  },
  async createTransations({ commit }, objectRelations) {
    commit(
      "createTransationsSuccess",
      await api.postTransations(objectRelations)
    );
  },
  async deleteTransations({ commit }, data) {
    commit("deleteTransationsSuccess", await api.postTransations(data));
  },
  async saveCurrentSection({ commit }, dataSectionGuidlines) {
    commit("startSaving");
    await api.saveSectionContent(dataSectionGuidlines);
    commit("finishSaving");
  },
  async getDataTimeTrackingBymeRequest({ commit }) {
    commit(
      "getDataTimeTrackingBymeSuccess",
      await api.getDataTimeTrackingByme()
    );
  },
  async getDataTimerTrackingMemberRequest({ commit }) {
    commit(
      "getDataTimerTrackingMemberSuccess",
      await api.getDataTimeTrackingMember()
    );
  },
  async createTimerTracking({ commit }, objectTimerTracking) {
    commit(
      "createTimerTrackingSuccess",
      await api.postTimerTracking(objectTimerTracking)
    );
  },
  async createDataComment({ commit }, newComment) {
    commit("postDataCommentSuccess", await api.postDataComment(newComment));
  },
  async getDataSectionHeadlineRequest({ commit }) {
    commit("getDataSectionHeadlineSuccess", await api.getDataSectionHeadline());
  },
  async createSection({ commit }, objectSection) {
    commit("createSectionSuccess", objectSection);
  }
};

const mutations = {
  getDataApprovalsSuccess(state, dataApprovals) {
    state.dataApprovals = dataApprovals;
  },
  getDataCategorySuccess(state, dataCategory) {
    state.dataCategory = dataCategory;
  },
  getDataLifecycleSuccess(state, dataLifecycle) {
    state.dataLifecycle = dataLifecycle;
  },
  getDataRequirementsSuccess(state, dataRequirements) {
    state.dataRequirements = dataRequirements;
  },
  getDataFilingDocumentSuccess(state, dataDocument) {
    state.dataDocument = dataDocument;
  },
  getDataAvailableMentionsSuccess(state, dataAvailableMentions) {
    state.dataAvailableMentions = dataAvailableMentions;
  },
  getDataTicketMessagesSuccess(state, dataTicketMessages) {
    state.dataTicketMessages = dataTicketMessages;
  },
  createDocumentSuccess(state, documentFile) {
    state.dataDocument.push(documentFile);
  },
  changeTaskStatus(state, { selected, requirementId, taskId }) {
    const requirement = state.dataRequirements.filter(
      x => x.id === requirementId
    )[0];
    if (requirement) {
      const task = requirement.newCheckList.filter(x => x.id === taskId)[0];
      if (task) {
        task.listCheckbox = selected;
      }
    }
  },
  updateSectionContent(state, content) {
    state.content = content;
  },
  getDataRelationSuccess(state, dataRelation) {
    state.dataRelation = dataRelation;
  },
  deleteRelationSuccess(state, data) {
    state.dataRelation = data.relationArray.filter(
      x => x.id !== data.relationObject.id
    );
  },
  deleteTransationsSuccess(state, data) {
    state.dataTransations = data.transationsArray.filter(
      x => x.id !== data.transationsObject.id
    );
  },
  getDataTransationsSuccess(state, dataTransations) {
    state.dataTransations = dataTransations;
  },
  startSaving(state) {
    state.saving = true;
  },
  finishSaving(state) {
    state.saving = false;
  },
  getDataTimeTrackingBymeSuccess(state, myDataTimerTracking) {
    state.myDataTimerTracking = myDataTimerTracking;
  },
  getDataTimerTrackingMemberSuccess(state, dataMemberTimerTracking) {
    state.dataMemberTimerTracking = dataMemberTimerTracking;
  },
  createTimerTrackingSuccess(state, objectTimerTracking) {
    state.myDataTimerTracking.myData.push(objectTimerTracking);
  },
  postDataCommentSuccess(state, newComment) {
    state.dataTicketMessages = [newComment, ...state.dataTicketMessages];
  },
  createDataRelationsSuccess(state, objectRelations) {
    state.dataRelation = [objectRelations, ...state.dataRelation];
  },
  createTransationsSuccess(state, objectTransations) {
    state.dataTransations = [objectTransations, ...state.dataTransations];
  },
  getDataSectionHeadlineSuccess(state, dataSectionHeadline) {
    state.dataSectionHeadline = dataSectionHeadline;
  },
  createSectionSuccess(state, objectSection) {
    state.dataSectionHeadline.push(objectSection);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
