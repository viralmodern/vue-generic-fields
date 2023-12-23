import discussion from "./matter.briefcase.discussion";
import casebrief from "./matter.briefcase.casebrief";
import meeting from "./matter.briefcase.meeting";
import billing from "./matter.briefcase.billing";
import docket from "./matter.briefcase.docket";
import chart from "./matter.briefcase.billing.chart";
import discussionInternal from "./matter.briefcase.discussionInternal";
import yourdesk from "./matter.briefcase.yourdesk";

const state = {};
const getters = {};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    discussion,
    meeting,
    casebrief,
    billing,
    docket,
    chart,
    discussionInternal,
    yourdesk
  }
};
