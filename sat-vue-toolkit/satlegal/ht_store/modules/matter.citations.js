import api from "../../api/matter.citations";
import citationsIssue from "./matter.citations.issue";
import ruleOfLaw from "./matter.citations.issue.ruleOfLaw";
import detail from "./matter.citations.detail";

const state = {
  dataMatterCitations: {}
};
const getters = {
  dataMatterCitations: state => state.dataMatterCitations
};
const actions = {
  async getDataCitationsFromApi({ commit }) {
    commit("getDataCitationsFromApi", await api.getDataCitationsFromApi());
  },
  async addDataCitationsRequest({ commit }, data) {
    const result = await api.addDataCitations(data);
    const dataFromApi = {
      id: Math.random(),
      name: data.caseName,
      issue: [1, 2, 3],
      creator: 1,
      vulnerability: 1,
      favorable: 1,
      lastTimeUsed: "2019-02-17T11:20:10.000Z",
      treatment: 1,
      limitation: 1
    };
    commit("addDataCitations", dataFromApi);
    return result;
  },
  updateTaskCitation({ commit }, data) {
    commit("updateTaskCitationSuccess", data);
  },
  updateTaskIssue({ commit }, data) {
    commit("updateTaskIssueSuccess", data);
  },
  // Criteria
  async addGroupCriteria({ commit }, data) {
    commit("checkItemCriteria", data, await api.addGroupCriteria());
  },
  async removeGroupCriteria({ commit }, data) {
    commit("removeGroupCriteria", data, await api.removeGroupCriteria());
  },
  async addItemInGroupCriteria({ commit }, data) {
    commit("addItemInGroupCriteria", data, await api.addItemInGroupCriteria());
  },
  async removeItemCriteria({ commit }, data) {
    commit("removeItemCriteria", data, await api.removeItemCriteria());
  },
  async updateItemCriteria({ commit }, data) {
    commit("updateItemCriteria", data, await api.updateItemCriteria());
  },
  async checkItemCriteria({ commit }, data) {
    commit("checkItemCriteria", data, await api.checkItemCriteria());
  },
  // Celebrity
  async addGroupCelebrity({ commit }, data) {
    commit("addGroupCelebrity", data, await api.addGroupCelebrity());
  },
  async removeGroupCelebrity({ commit }, data) {
    commit("removeGroupCelebrity", data, await api.removeGroupCelebrity());
  },
  async addItemInGroupCelebrity({ commit }, data) {
    commit(
      "addItemInGroupCelebrity",
      data,
      await api.addItemInGroupCelebrity()
    );
  },
  async removeItemInGroupCelebrity({ commit }, data) {
    commit(
      "removeItemInGroupCelebrity",
      data,
      await api.removeItemInGroupCelebrity()
    );
  },
  async updateItemInGroupCelebrity({ commit }, data) {
    commit(
      "updateItemInGroupCelebrity",
      data,
      await api.updateItemInGroupCelebrity()
    );
  },
  async checkItemCelebrity({ commit }, data) {
    commit("checkItemCelebrity", data, await api.checkItemCelebrity());
  },
  async addDataIssueRequest({ commit }, data) {
    data.id = Math.random();
    commit("addDataIssue", data);
  },
  async removeDataIssueRequest({ commit }, id) {
    commit("removeDataIssue", id);
  },
  async removeDataCitationRequest({ commit }, id) {
    commit("removeDataCitation", id);
  }
};
const mutations = {
  getDataCitationsFromApi(state, dataMatterCitations) {
    state.dataMatterCitations = dataMatterCitations;
  },
  addDataCitations(state, data) {
    state.dataMatterCitations.citations.unshift(data);
  },
  addDataIssue(state, data) {
    state.dataMatterCitations.issueGrid.unshift(data);
  },
  removeDataIssue(state, id) {
    state.dataMatterCitations.issueGrid = state.dataMatterCitations.issueGrid.filter(
      x => x.id !== id
    );
  },
  removeDataCitation(state, id) {
    state.dataMatterCitations.citations = state.dataMatterCitations.citations.filter(
      x => x.id !== id
    );
  },
  updateTaskCitationSuccess(state, data) {
    const task = state.dataMatterCitations.citations.find(
      x => x.id === data.taskId
    );
    switch (data.columnName) {
      case "name":
        task.name = data.newValue;
        break;
      case "favorable":
        task.favorable = data.newValue.id;
        break;
      case "vulnerablity":
        task.vulnerability = data.newValue.id;
        break;
      case "limitation":
        task.limitation = data.newValue.id;
        break;
      case "tremeant":
        task.treatment = data.newValue.id;
        break;
      case "lastTimeUser":
        task.lastTimeUsed = data.newValue;
        break;
      case "issue":
        var isCheck = task.issue.some(x => x === data.newValue);
        if (!isCheck) {
          task.issue = [...task.issue, data.newValue];
        } else {
          task.issue = task.issue.filter(x => x !== data.newValue);
        }
        break;
    }
    return task;
  },
  updateTaskIssueSuccess(state, data) {
    const task = state.dataMatterCitations.issueGrid.find(
      x => x.id === data.taskId
    );
    switch (data.columnName) {
      case "briefanswer":
        task.briefAnswer = data.newValue;
        break;
      case "applicationFact":
        task.applicationOfFact = data.newValue;
        break;
      case "linkedFact":
        task.linkedFact = data.newValue;
        break;
      case "ruleOfLaw":
        task.ruleOfLaw = data.newValue;
        break;
      case "citationissue":
        var isLabel = task.issue.some(x => x === data.newValue);
        if (!isLabel) {
          task.issue = [...task.issue, data.newValue];
        } else {
          task.issue = task.issue.filter(x => x !== data.newValue);
        }
        break;
    }
    return task;
  },
  addGroupCelebrity(state, groupName) {
    state.dataMatterCitations.celebrity.push({
      id: Math.random(),
      groupName,
      list: []
    });
  },
  removeGroupCelebrity(state, idChecklist) {
    state.dataMatterCitations.celebrity = state.dataMatterCitations.celebrity.filter(
      x => x.id !== idChecklist
    );
  },
  addItemInGroupCelebrity(state, name) {
    state.dataMatterCitations.celebrity
      .find(x => x.id === name.groupId)
      .list.push({
        id: Math.random(),
        name: name.name,
        status: false
      });
  },
  removeItemInGroupCelebrity(state, data) {
    let findOneAndRemove = state.dataMatterCitations.celebrity.find(
      x => x.id === data.groupId
    );
    findOneAndRemove.list = findOneAndRemove.list.filter(x => x.id !== data.id);
  },
  updateItemInGroupCelebrity(state, data) {
    let findOneAndRemove = state.dataMatterCitations.celebrity.find(
      x => x.id === data.groupId
    );
    findOneAndRemove.list.find(x => x.id === data.id).name = data.name;
  },
  checkItemCelebrity(state, data) {
    let findOneAndUpdate = state.dataMatterCitations.celebrity.find(
      x => x.id === data.groupId
    );
    findOneAndUpdate.list.find(x => x.id === data.id).status = data.status;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules: {
    ruleOfLaw,
    citationsIssue,
    detail
  }
};
