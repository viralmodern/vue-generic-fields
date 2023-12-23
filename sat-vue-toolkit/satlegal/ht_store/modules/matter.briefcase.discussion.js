import message from "./matter.briefcase.discussion.message"
import document from "./matter.briefcase.discussion.document"
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
    message,
    document
  }
};
