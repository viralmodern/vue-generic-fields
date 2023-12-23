import Cookies from "js-cookie";
import { dataProject } from "../../mock-data/data-project";
import api from "../../api/project";
import filing from "./project.filing";
import filingRoom from "./project.filingRoom";
import policy from "./project.policy";
import document from "./project.document";
import signature from "./project.signature";
import contacts from "./project.contacts";
import exhibits from "./project.exhibits";
import exhibitDocument from "./project.exhibit.document";
import contactsNotes from "./project.contacts.notes";
import contactsDocuments from "./project.contacts.document";
import credlibleBoard from "./project.detail.credlible";
import board from "./project.board";
import resources from "./project.resources";
import members from "./project.member";
import clients from "./project.client";
import projectList from "./project.list";
import overview from "./project.overview";
import research from "./project.research";

const state = {
  dataAssignedTome: {},
  dataAssignedTomeCard: [],
  totalAssignedTomeCard: 0,
  loading: false,
  dataManageByMe: {},
  dataManageByMeCard: [],
  totalManageByMeCard: 0,
  dataProject: [],
  loadingProject: false,
  dataBackgroundColor: [],
  themeColor: "",
  projectDetail: null,
  dataProjectMembers: [],
  emailAddress: null,
  loadingProjectDetail: false,
  dataLabelProject: [],
  dataProjectId: {},
  detailInvitedMember: []
};

const getters = {
  dataAssignedTome: state => state.dataAssignedTome,
  dataManageByMe: state => state.dataManageByMe,
  dataAssignedTomeCard: state => state.dataAssignedTomeCard,
  dataManageByMeCard: state => state.dataManageByMeCard,
  hasMoreItemAssignedTome: state =>
    state.totalAssignedTomeCard > state.dataAssignedTomeCard.length,
  hasMoreItemManageByMe: state =>
    state.totalManageByMeCard > state.dataManageByMeCard.length,
  loading: state => state.loading,
  themeColor: state => state.themeColor,
  dataBackgroundColor: state => state.dataBackgroundColor,
  projectDetail: state => state.projectDetail,
  loadingProject: state => state.loadingProject,
  dataProject: state => state.dataProject,
  dataProjectMembers: state => state.dataProjectMembers,
  emailAddress: state => state.emailAddress,
  loadingProjectDetail: state => state.loadingProjectDetail,
  dataLabelProject: state => state.dataLabelProject,
  dataProjectId: state => state.dataProjectId,
  detailInvitedMember: state => state.detailInvitedMember
};

const actions = {
  async getDataAssignedTome({ commit }) {
    commit("loadingSuccess", true);
    commit("getDataAssignedTomeSuccess", await api.getDataProjectAssignToMe());
    commit("loadingSuccess", false);
  },
  async getDataManageByMe({ commit }) {
    commit("loadingSuccess", true);
    commit("getDataManageByMeSuccess", await api.getDataProjectManageByMe());
    commit("loadingSuccess", false);
  },
  async getAssignedTomeCardRequest({ commit }, pagination = {}) {
    const { page, pageSize } = pagination;
    commit("loadingSuccess", true);
    const paginationAssignedTomeCard = {
      pageSize,
      pageIndex: page
    };
    commit(
      "getDataAssignedTomeCardSuccess",
      await api.getDataProjectAssignToMe(paginationAssignedTomeCard)
    );
    commit("loadingSuccess", false);
  },
  async getManageByMeCardRequest({ commit }, pagination = {}) {
    const { page, pageSize } = pagination;
    commit("loadingSuccess", true);
    const paginationManageByMeCard = {
      pageSize,
      pageIndex: page
    };
    commit(
      "getDataManageByMeCardSuccess",
      await api.getDataProjectManageByMe(paginationManageByMeCard)
    );
    commit("loadingSuccess", false);
  },
  async getDataBackgroundColor({ commit }) {
    commit("getDatathemeColorProject", await api.getDatathemeColorProject());
  },
  async selectThemeColor({ commit }, themeColor) {
    commit("selectThemeColorSuccess", themeColor);
  },
  async changeThemeColor({ commit }, themeColor) {
    commit("changeThemeColorSuccess", themeColor);
  },
  async getProjectDetailRequest({ commit }, projectDetail) {
    commit("startLoadingProjectDetail");
    commit(
      "getProjectDetailSuccess",
      await api.getProjectDetail(projectDetail)
    );
    commit("finishLoadingProjectDetail");
  },
  async getDataProjectRequest({ commit }) {
    commit("setLoadingProject", true);
    setTimeout(() => {
      commit("getDataProjectSuccess", dataProject);
      commit("setLoadingProject", false);
    }, 1500);
  },
  async getProjectMembers({ commit }) {
    commit("getProjectMembersSuccess", await api.getProjectMembers());
  },
  async createThemeColorRequest({ commit }, itemColor) {
    commit("createThemeColorSuccess", await api.createThemeColor(itemColor));
  },
  async inviteMemberToProjectRequest({ commit }, data) {
    commit(
      "inviteMemberToProjectSuccess",
      await api.inviteMemberToProject(data)
    );
  },
  async getLabelsByProjectRequest({ commit }, projectId) {
    commit("getLabelsByProject", await api.getDataLableByProject(projectId));
  },
  async getDataProjectByIdRequest({ commit }, projectId) {
    commit("getDataProjectById", await api.getDataProjectById(projectId));
  },
  async getDetailInvitedMemberRequest({ commit }) {
    commit("getDetailInvitedMemberSuccess", await api.getDetailInvitedMember());
  }
};

const mutations = {
  getDataAssignedTomeSuccess(state, dataAssignedTome) {
    state.dataAssignedTome = dataAssignedTome;
  },
  getDataAssignedTomeCardSuccess(state, data) {
    state.dataAssignedTomeCard = [
      ...state.dataAssignedTomeCard,
      ...data.list.map(e => ({
        ...e,
        id: Math.random()
          .toString(36)
          .substring(7)
      }))
    ];
    state.totalAssignedTomeCard = data.totals;
  },
  clearDataAssignedTomeCard(state) {
    state.dataAssignedTomeCard = [];
    state.totalAssignedTomeCard = 0;
  },
  clearDataManageByMeCard(state) {
    state.dataManageByMeCard = [];
    state.totalManageByMeCard = 0;
  },
  getDataManageByMeSuccess(state, dataManageByMe) {
    state.dataManageByMe = dataManageByMe;
  },
  getDataManageByMeCardSuccess(state, data) {
    state.dataManageByMeCard = [
      ...state.dataManageByMeCard,
      ...data.list.map(e => ({
        ...e,
        id: Math.random()
          .toString(36)
          .substring(7)
      }))
    ];
    state.totalManageByMeCard = data.totals;
  },
  getDataProjectSuccess(state, dataProject) {
    state.dataProject = dataProject;
  },
  loadingSuccess(state, loading) {
    state.loading = loading;
  },
  getDatathemeColorProject(state, dataBackgroundColor) {
    state.dataBackgroundColor = dataBackgroundColor;
  },
  selectThemeColorSuccess(state, themeColor) {
    state.themeColor = themeColor;
  },
  changeThemeColorSuccess(state, themeColor) {
    state.themeColor = themeColor;
    Cookies.set("themeGeneral", themeColor);
  },
  getProjectDetailSuccess(state, projectDetail) {
    state.projectDetail = projectDetail;
  },
  setLoadingProject(state, status) {
    state.loadingProject = status;
  },
  getProjectMembersSuccess(state, dataProjectMembers) {
    state.dataProjectMembers = dataProjectMembers;
  },
  createThemeColorSuccess(state, itemColor) {
    state.itemColor = itemColor;
  },
  inviteMemberToProjectSuccess(state, data) {
    state.dataProjectMembers = [...state.dataProjectMembers, data];
  },
  getDetailInvitedMemberSuccess(state, detailInvitedMember) {
    state.detailInvitedMember = detailInvitedMember;
  },
  selectMember(state, data) {
    let isActive = state.detailInvitedMember.some(z => z.id === data.id);
    if (isActive) {
      state.detailInvitedMember = state.detailInvitedMember.filter(
        x => x.id !== data.id
      );
    }
  },
  invitedMember(state, data) {
    state.detailInvitedMember = [...state.detailInvitedMember, data];
  },
  startLoadingProjectDetail(state) {
    state.loadingProjectDetail = true;
  },
  finishLoadingProjectDetail(state) {
    state.loadingProjectDetail = false;
  },
  cleanUpPageData(state) {
    state.dataAssignedTome = {};
    state.dataAssignedTomeCard = [];
    state.totalAssignedTomeCard = 0;
    state.loading = false;
    state.dataManageByMe = {};
    state.dataManageByMeCard = [];
    state.totalManageByMeCard = 0;
  },
  getLabelsByProject(state, dataLabels) {
    state.dataLabelProject = dataLabels;
  },
  getDataProjectById(state, data) {
    state.dataProjectId = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    filing,
    filingRoom,
    policy,
    document,
    signature,
    contacts,
    exhibits,
    exhibitDocument,
    contactsNotes,
    contactsDocuments,
    credlibleBoard,
    board,
    resources,
    members,
    clients,
    projectList,
    overview,
    research
  }
};
