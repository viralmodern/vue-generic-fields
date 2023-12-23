import api from "../../api/project.profile.detail.character";
import moment from "moment";
import character from "./matter.character.profile.filter";
import goal from "./matter.character.profile.detail.goals";
import about from "./matter.character.profile.detail.about";
import notes from "./matter.character.profile.detail.notes";
import document from "./matter.character.profile.detail.document";
import credibilities from "./matter.character.profile.detail.credibilities";
import {$$STORE_PREFIX} from "../../utils";

const state = {
  dataProfileCharacter: {},
  dataProfile: {},
  listRelationship: [],
  characterMapping: []
};

const getters = {
  dataProfileCharacter: (state, getters, rootState, rootGetters) => {
    const filters =
      rootGetters["ht_store/matter/character/characterProfile/character/activeFilters"];
    let tasks =
      state.dataProfileCharacter.dataProfile &&
      state.dataProfileCharacter.dataProfile.slice();
    filters.forEach(filter => {
      switch (filter.name) {
        case "creator":
          if (!filter.value) return;
          var userId = filter.value.map(i => i.id);
          tasks = tasks.filter(e => {
            return userId.includes(e.creator);
          });
          break;
        case "tag":
          if (!filter.value) return;
          var tagId = filter.value.map(i => i.id);
          tasks = tasks.reduce((sum, task) => {
            var check = task.tag.filter(x => tagId.find(id => id === x));
            if (check.length !== 0) {
              sum = [...sum, task];
            }
            return sum;
          }, []);
          break;
        case "assignee":
          if (!filter.value) return;
          var assigneeId = filter.value.map(i => i.id);
          tasks = tasks.reduce((sum, task) => {
            var check = task.assignee.filter(assignee =>
              assigneeId.find(id => id === assignee)
            );
            if (check.length !== 0) {
              sum = [...sum, task];
            }
            return sum;
          }, []);
          break;
        case "startdate":
          if (!filter.value) return;
          var startDate = moment(filter.value);
          tasks = tasks.filter(x => {
            return (
              new Date(x.dateTime.from).getTime() >
              new Date(startDate).getTime()
            );
          });
          break;
        case "enddate":
          if (!filter.value) return;
          var endDate = moment(filter.value);
          tasks = tasks.filter(x => {
            return (
              new Date(x.dateTime.from).getTime() < new Date(endDate).getTime()
            );
          });
          break;
      }
    });
    return tasks;
  },
  dataProfile: state => state.dataProfileCharacter,
  listRelationship: state => state.dataProfileCharacter.listRelationship,
  characterMapping: state => state.dataProfileCharacter.characterMapping
};

const actions = {
  async getDataProfileCharacter({ commit }) {
    commit(
      "getDataProfileCharacter",
      await api.getDataDetailProfileCharacter()
    );
  },
  async updateTask({ commit }, data) {
    commit("updateTaskSuccess", data);
  },
  async addAssignee({ commit }, data) {
    commit("addAssigneeSuccess", data);
  },
  async removeAssignee({ commit }, data) {
    commit("removeAssigneeSuccess", data);
  },
  async updateAvatar({ commit }, url) {
    commit("updateAvatar", url, await api.updateAvatar());
  },
  changeDescription({ commit }, data) {
    commit("changeDescription", data, api.changeDescription());
  },
  async addMappingSupport({ commit }, data) {
    commit("addMappingSupport", data, await api.addMappingSupport(data));
  },
  async updateTaskSupport({ commit }, data) {
    commit("updateTaskSupport", data, await api.updateTaskSupport(data))
  },
  async addSupportRequest({ commit }, data) {
    commit("addSupportRequest", data, await api.addSupportRequest(data))
  },
  async addSubItemInTabel({ commit }, data) {
    commit("addSubItemInTabel", data, await api.addSubItemInTabel(data))
  }
};

const mutations = {
  updateTaskSupport(state, data) {
    const task = state.dataProfileCharacter.characterMapping.find(
      x => x.id === data.expanId
    ).support.find(y => y.id === data.idGroup).list.find(z => z.id === data.id)
    switch (data.columnName) {
      case "name":
        task.name = data.name
        break;
      case "progress":
        task.progress = data.newValue
        break;
      case "strength":
        task.strength = data.newValue
        break
      case "character":
        if (data.type === "add") {
          task.characters = [...task.characters, data.newValue]
        } else if (data.type === "remove") {
          task.characters = task.characters.filter(x => x !== data.newValue)
        }
        break;
      case "action":
        var action = state.dataProfileCharacter.characterMapping.find(
          x => x.id === data.expanId
        ).support.find(y => y.id === data.idGroup)
        action.list = action.list.filter(z => z.id !== data.id)
        break
    }
  },
  getDataProfileCharacter(state, dataProfileCharacter) {
    state.dataProfileCharacter = dataProfileCharacter;
  },
  addMappingSupport(state, data) {
    state.dataProfileCharacter.characterMapping = [
      ...state.dataProfileCharacter.characterMapping,
      data
    ];
  },
  updateAvatar(state, url) {
    state.dataProfileCharacter.avatar = url;
  },
  changeDescription(state, data) {
    state.dataProfileCharacter.description = data;
  },
  addSupportRequest(state, o) {
    state.dataProfileCharacter.characterMapping.find(x => x.id === o.expanId).support.push(o.data)
  },
  addSubItemInTabel(state, o) {
    state.dataProfileCharacter.characterMapping.find(
      x => x.id === o.expanId
    ).support.find(x => x.id === o.idGroup).list.push(o.data)
  },
  removeAssigneeSuccess(state, data) {
    let arrayCharacter = state.dataProfileCharacter.dataProfile;
    let stageAssignee = arrayCharacter.find(x => x.id === data.taskId);
    var assignee = stageAssignee.assignee.some(x => x === data.newValue.id);
    if (assignee) {
      stageAssignee.assignee = stageAssignee.assignee.filter(
        x => x !== data.newValue.id
      );
    }
  },
  addAssigneeSuccess(state, data) {
    let arrayCharacter = state.dataProfileCharacter.dataProfile;
    let stageAssignee = arrayCharacter.find(x => x.id === data.taskId);
    var assignee = stageAssignee.assignee.some(x => x === data.newValue.id);
    if (!assignee) {
      stageAssignee.assignee = [...stageAssignee.assignee, data.newValue.id];
    }
  },
  updateTaskSuccess(state, data) {
    const task = state.dataProfileCharacter.dataProfile.find(
      x => x.id === data.taskId
    );
    switch (data.columnName) {
      case "factname":
        task.factName = data.newValue;
        break;
      case "facttype":
        task.factType = data.newValue;
        break;
      case "time":
        if (data.type === "date") {
          task.time = data.newValue;
        } else if (data.type === "time") {
          task.time = data.newValue;
        }
        break;
      case "dateadded":
        if (data.type === "date") {
          task.dataAdded = data.newValue;
        } else if (data.type === "time") {
          task.dataAdded = data.newValue;
        }
        break;
      case "tag":
        var tag = task.tag.some(x => x === data.newValue);
        if (tag) {
          task.tag = task.tag.filter(x => x !== data.newValue);
        } else {
          task.tag = [...task.tag, data.newValue];
        }
        break;
      case "linkedrecords":
        break;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    character,
    goal,
    about,
    notes,
    document,
    credibilities
  }
};
