import notification from "./client-portal.notification";
import document from "./client-portal.document";
import billing from "./client-portal.billing";
import matter from "./client-portal.matter";
import meeting from "./client-portal.meeting";
import inbox from "./client-portal.inbox";
import profile from "./client-portal.profile";
import addressbook from "./client-portal.addressbook";

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
    notification,
    document,
    billing,
    matter,
    meeting,
    inbox,
    profile,
    addressbook
  }
};
