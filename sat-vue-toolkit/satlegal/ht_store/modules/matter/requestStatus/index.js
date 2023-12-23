import requestSet from "./requestSet";
import requestItem from "./requestItem"
import requestSetDefinition from "./requestSetDefinition";
import requestSetsItemDocument from "./requestSetsItemDocument"
import requestSetsDocument from "./requestSetsDocument"
import requestSetTask from "./request-set-task";
import requestSetExpense from "./requestSetExpense";

const actions = {};
const getters = {};
const mutations = {};
const state = {};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  modules: {
    requestSet,
    requestItem,
    requestSetDefinition,
    requestSetsItemDocument,
    requestSetTask,
    requestSetExpense,
    requestSetsDocument
  }
};
