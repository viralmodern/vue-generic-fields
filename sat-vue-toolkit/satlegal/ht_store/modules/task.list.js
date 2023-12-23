import api from "../../api/task.list";
import checklist from "./task.list.checklist";
import _ from "lodash";
import members from "./task.list.members";
import note from "./task.list.note";
import citation from "./task.list.citation";
import peopleGroup from "./task.detail.peopleGroup";
import subtask from "./task.list.subtask";
import issue from "./matter.desk.issue";
import moment from "moment";
import {$$STORE_PREFIX} from "../../utils";
const state = {
  all: [],
  totals: 0,
  loading: false,
  stages: [],
  selectedStages: []
};
function priorityByNull(priority) {
  if (priority === 0) return 0;
  if (!priority) return 10000;
  return priority;
}
function durationFromStartToEnd(start, end) {
  if (!start || !end) return null;
  const momentStart = moment(start);
  const momentEnd = moment(end);
  return (
    (moment.duration(momentEnd.diff(momentStart)).as("days") + 1) * 24 * 60 * 60
  );
}
function dateWithoutHours(date) {
  if (!date) return null;
  const currentDate = new Date(date);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const timeStamp = new Date(
    `${currentYear}-${currentMonth}-${currentDay} 00:00:00`
  ).getTime();
  return new Date(timeStamp).getTime();
}
const getters = {
  totals: state => state.totals,
  loading: state => state.loading, // remove later
  stages: state => {
    const stages = state.stages.slice();
    stages.forEach(s => {
      s.selected = state.selectedStages.some(x => x === s.id);
    });
    return stages;
  },
  tasksInKanban: (state, getters) => {
    return getters.filteredTasks
      .slice()
      .sort((a, b) => priorityByNull(a.priority) - priorityByNull(b.priority));
  },
  tasksInGantt: (state, getters) => {
    let list = [];
    getters.tasksInStages.forEach(stage => {
      const ganttStageId = `st_${stage.id}`;
      const start = stage.tasks
        .slice()
        .map(x => dateWithoutHours(x.startDate))
        .sort((a, b) => a - b)[0];
      const end = stage.tasks
        .slice()
        .map(x => dateWithoutHours(x.duaDate))
        .sort((a, b) => b - a)[0];
      const duration = durationFromStartToEnd(start, end);
      list.push({
        id: ganttStageId,
        ctype: "stage",
        start,
        duration,
        progress: 100,
        type: "project",
        object: stage
      });
      stage.tasks.forEach(task => {
        list.push({
          id: `tk_${task.id}`,
          ctype: "task",
          type: "task",
          parentId: ganttStageId,
          start: dateWithoutHours(task.startDate),
          duration: durationFromStartToEnd(task.startDate, task.duaDate),
          progress: 80,
          object: task
        });
      });

      list.push({
        id: `add_new_tk_${stage.id}`,
        ctype: "add_task",
        type: "task",
        parentId: ganttStageId,
        progress: 100,
        object: stage
      });
    });
    list.push({
      id: `add_new_stage`,
      ctype: "add_stage",
      type: "project"
    });
    let listInColor = list.map(x => {
      if (x.progress <= 20) {
        let dataColor = {
          base: {
            fill: "#95D409",
            stroke: "#95D409"
          }
        };
        return Object.assign(x, { style: dataColor });
      } else if (x.progress <= 40) {
        let dataColor = {
          base: {
            fill: "#24D8B1",
            stroke: "#24D8B1"
          }
        };
        return Object.assign(x, { style: dataColor });
      } else if (x.progress <= 60) {
        let dataColor = {
          base: {
            fill: "#AA55FB",
            stroke: "#AA55FB"
          }
        };
        return Object.assign(x, { style: dataColor });
      } else if (x.progress <= 80) {
        let dataColor = {
          base: {
            fill: "#FEC901",
            stroke: "#FEC901"
          }
        };
        return Object.assign(x, { style: dataColor });
      } else if (x.progress <= 90) {
        let dataColor = {
          base: {
            fill: "#95D409",
            stroke: "#95D409"
          }
        };
        return Object.assign(x, { style: dataColor });
      } else {
        let dataColor = {
          base: {
            fill: "#5175FD",
            stroke: "#5175FD"
          }
        };
        return Object.assign(x, { style: dataColor });
      }
    });
    return (list = listInColor);
  },
  tasks: (state, getters) => {
    let tasks = getters.filteredTasks;
    if (state.selectedStages && state.selectedStages.length) {
      tasks = tasks.filter(
        x => x.stage && state.selectedStages.some(r => r === x.stage.id)
      );
    }
    return tasks
      .slice()
      .sort((a, b) => priorityByNull(a.priority) - priorityByNull(b.priority));
  },
  tasksInStages: (state, getters) => {
    let tasks = getters.filteredTasks
      .slice()
      .sort((a, b) => priorityByNull(a.priority) - priorityByNull(b.priority));
    let stages = state.stages.slice().map(x => ({ ...x, tasks: [] }));
    tasks.forEach(task => {
      let stage = stages.filter(x => task.stage && x.id === task.stage.id)[0];
      if (!stage) return;
      stage.tasks = stage.tasks || [];
      stage.tasks.push(task);
    });
    return stages;
  },
  filteredTasks: (state, getters, rootState, rootGetters) => {
    const filters = rootGetters["ht_store/project/board/filter/activeFilters"];
    let tasks = state.all.slice();
    filters.forEach(filter => {
      switch (filter.name) {
        case "cardName":
          if (!filter.value) return;
          tasks = tasks.filter(
            x =>
              x.cardName &&
              x.cardName.toLowerCase().indexOf(filter.value.toLowerCase()) > -1
          );
          break;
        case "attachment":
          if (!filter.value) return;
          tasks = tasks.filter(
            x =>
              !!x.attachment.find(
                y =>
                  y.name &&
                  y.name.toLowerCase().indexOf(filter.value.toLowerCase()) > -1
              )
          );
          break;
        case "vulnerability":
          if (!filter.value || !filter.value.length) return;
          tasks = tasks.filter(x =>
            filter.value.some(x1 => x1.id === x.vulnerability.id)
          );
          break;
        case "dueDate":
          if (!filter.value) return;
          tasks = tasks.filter(
            x => moment(x.duaDate).format("YYYY-MM-DD") == filter.value
          );
          break;
        case "favorable":
          if (!filter.value || !filter.value.length) return;
          tasks = tasks.filter(x =>
            filter.value.some(x1 => x1.id === x.favorable.id)
          );
          break;
        case "treatment":
          if (!filter.value || !filter.value.length) return;
          tasks = tasks.filter(x =>
            filter.value.some(x1 => x1.id === x.treatment.id)
          );
          break;
        case "risk":
          if (!filter.value || !filter.value.length) return;
          tasks = tasks.filter(x =>
            filter.value.some(x1 => x1.id === x.risk.id)
          );
          break;
        case "location":
          if (!filter.value || !filter.value.length) return;
          tasks = tasks.filter(x => {
            if (!x.location.length) {
              return;
            }
            let status = false;
            for (var i = 0; i < x.location.length; i++) {
              if (filter.value.some(x1 => x1 === x.location[i])) {
                status = true;
                break;
              }
            }
            return status;
          });
          break;
        case "labels":
          if (!filter.value || !filter.value.length) return;
          tasks = tasks.filter(x => {
            if (!x.labels.length) {
              return;
            }
            let status = false;
            for (var i = 0; i < x.labels.length; i++) {
              if (filter.value.some(x1 => x1.id === x.labels[i].id)) {
                status = true;
                break;
              }
            }
            return status;
          });
          break;
        case "people":
          if (!filter.value || !filter.value.length) return;
          tasks = tasks.filter(x => {
            if (!x.people.length) {
              return false;
            }
            let status = false;
            for (var i = 0; i < x.people.length; i++) {
              if (status) break;
              if (!x.people[i].member.length) {
                return false;
              }
              for (var j = 0; j < x.people[i].member.length; j++) {
                if (
                  filter.value.some(x1 => x1.id === x.people[i].member[j].id)
                ) {
                  status = true;
                  break;
                }
              }
            }
            return status;
          });
          break;
        case "estimation":
          if (!filter.value) return;
          tasks = tasks.filter(
            x =>
              x.estimation >= filter.value.start &&
              x.estimation <= filter.value.end
          );
          break;
        case "progress":
          if (!filter.value) return;
          tasks = tasks.filter(
            x =>
              x.progress >= filter.value.start && x.progress <= filter.value.end
          );
          break;
        case "members":
          {
            if (!filter.value) return;
            let memberFilter = filter.value.map(x => x.email);
            if (memberFilter.length > 0) {
              tasks = tasks.filter(y =>
                memberFilter.some(m => y.members.map(z => z.email).includes(m))
              );
            } else {
              return tasks;
            }
          }
          break;
      }
    });
    return tasks;
  }
};

const actions = {
  async filterTasks({ commit }) {
    commit("startLoading");
    commit("populateFilterResult", await api.filterTasks());
    commit("stopLoading");
  },
  async getAllTasks({ commit }) {
    commit("populateAllTasks", await api.getAllTasks());
  },
  async addTopicTaskBoard({ commit }, data) {
    commit("addTopicTaskBoardSuccess", await api.postAddTaskBoard(data));
  },
  async addItemTaskBoard({ commit }, data) {
    commit("addItemTaskBoardSuccess", await api.postAddItemTaskBoard(data));
  },
  async addSubTaskBoard({ commit }, data) {
    commit("addSubTaskBoardSuccess", await api.postAddSubTaskBoard(data));
  },
  async getAllTaskStages({ commit }) {
    commit("populateTaskStages", await api.getAllTaskStages());
  },
  async removeItemOfTreeCard({ commit }, data) {
    commit("deleteItemOfTreeCard", await api.postRemoveItemOftreeCard(data));
  },
  async updateTask({ commit }, { taskId, columnName, newValue }) {
    const task = state.all.filter(x => x.id === taskId)[0];
    if (!task) return;
    const cloneTask = _.cloneDeep(task);
    switch (columnName) {
      case "cardName":
        cloneTask.cardName = newValue;
        break;
      case "duaDate":
        cloneTask.duaDate = newValue;
        break;
      case "progress":
        cloneTask.progress = newValue;
        break;
      case "vulnerability":
        cloneTask.vulnerability = newValue;
        break;
      case "treatment":
        cloneTask.treatment = newValue;
        break;
      case "favorable":
        cloneTask.favorable = newValue;
        break;
      case "location":
        cloneTask.location = newValue;
        break;
      case "risk":
        cloneTask.risk = newValue;
        break;
      case "estimation":
        cloneTask.estimation = newValue;
        break;
      case "datehappened":
        cloneTask.datehappened = newValue;
        break;
      case "comments":
        cloneTask.ticketMessages.unshift(newValue);
        break;
      case "statuteOfLimitations":
        cloneTask.statuteOfLimitations = newValue;
        break;
    }
    const updateResult = await api.updateTask(cloneTask);
    if (updateResult) {
      commit("updateTaskSuccess", { taskId, columnName, newValue });
    }
  },
  async updateTask2Request({ commit }, data) {
    commit("updateTask2", data);
    return data;
  },
  async addMember({ commit }, data) {
    commit("addMemberSuccess", data, api.postCreateMember(data));
  },
  async removeMembers({ commit }, data) {
    commit("removeMembersSuccess", data, api.postRemoveMember(data));
  }
};

const mutations = {
  populateFilterResult(state, filterResult) {
    state.totals = filterResult.totals;
    state.all = filterResult.list;
  },
  populateAllTasks(state, all) {
    state.all = all;
  },
  populateTaskStages(state, stages) {
    state.stages = stages;
  },
  addTopicTaskBoardSuccess(state, data) {
    state.stages = [...state.stages, data];
  },
  addItemTaskBoardSuccess(state, data) {
    state.all.push(data);
  },
  addSubTaskBoardSuccess(state, data) {
    const task = state.all.filter(x => x.id === data.taskId)[0];
    delete data.taskId;
    task.subTasks.push(data);
  },
  updateTask2(state, data) {
    state.all = state.all.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  moveTask(state, { id, priority, isMoveUp }) {
    const task = state.all.filter(x => x.id === id)[0];
    if (!task) return;
    state.all
      .filter(x => x.priority > priority - (isMoveUp ? 1 : 0))
      .forEach(column => {
        column.priority += 2;
      });
    task.priority = priority + 1;
    state.all
      .sort((a, b) => priorityByNull(a.priority) - priorityByNull(b.priority))
      .forEach((column, index) => {
        column.priority = index;
      });
  },
  changeTaskStage(state, { id, newStageId }) {
    const task = state.all.filter(x => x.id === id)[0];
    if (!task) return;
    task.stage = { id: newStageId };
  },
  editListName(state, e) {
    state.stages.find(x => x.id === e.id).name = e.name;
  },
  removeItemTaskBoard(state, item) {
    state.stages = state.stages.filter(x => x.id !== item.id);
  },
  moveStage(state, newValue) {
    state.stages.sort(
      (a, b) => newValue.indexOf(a.id) - newValue.indexOf(b.id)
    );
  },
  deleteItemOfTreeCard(state, data) {
    state.all = state.all.filter(x => x.id !== data.id);
  },
  toggleStage(state, stageId) {
    if (state.selectedStages.some(x => x === stageId)) {
      const index = state.selectedStages.indexOf(stageId);
      state.selectedStages.splice(index, index + 1);
    } else {
      state.selectedStages.push(stageId);
    }
  },
  updateTaskSuccess(state, { taskId, columnName, newValue }) {
    const task = state.all.filter(x => x.id === taskId)[0];
    if (!task) return;
    switch (columnName) {
      case "cardName":
        task.cardName = newValue;
        break;
      case "location":
        task.location = newValue;
        break;
      case "checkList":
        if (newValue.handleName === "addGroup") {
          task.checkList = [
            { id: Math.random(), groupName: newValue.groupName, list: [] },
            ...task.checkList
          ];
        }
        if (newValue.handleName === "removeGroup") {
          task.checkList = task.checkList.filter(x => x.id !== newValue.id);
        }
        if (newValue.handleName === "addItemInGroup") {
          task.checkList
            .find(x => x.id === newValue.groupId)
            .list.push({
              id: Math.random(),
              name: newValue.name,
              status: false
            });
        }
        if (newValue.handleName === "removeItemInGroup") {
          let findOneAndRemove = task.checkList.find(
            x => x.id === newValue.groupId
          );
          findOneAndRemove.list = findOneAndRemove.list.filter(
            x => x.id !== newValue.id
          );
        }
        if (newValue.handleName === "checkItem") {
          let findOneAndUpdate = task.checkList.find(
            x => x.id === newValue.groupId
          );
          findOneAndUpdate.list.find(x => x.id === newValue.id).status =
            newValue.status;
        }
        break;
      case "duaDate":
        task.duaDate = newValue;
        break;
      case "progress":
        task.progress = newValue;
        break;
      case "vulnerability":
        task.vulnerability = newValue;
        break;
      case "treatment":
        task.treatment = newValue;
        break;
      case "favorable":
        task.favorable = newValue;
        break;
      case "estimation":
        task.estimation = newValue;
        break;
      case "attachment":
        if (newValue.handleName === "addFiles") {
          task.attachment = [...task.attachment, ...newValue.files];
        }
        if (newValue.handleName === "removeFile") {
          task.attachment = task.attachment.filter(x => x.id !== newValue.id);
        }
        if (newValue.handleName === "updateRate") {
          task.attachment = task.attachment.map(x => {
            if (x.id === newValue.id) {
              return { ...x, rate: !x.rate };
            } else return x;
          });
        }
        break;
      case "labels":
        if (newValue.handleName === "choseLabel") {
          const elementExists = task.labels.some(id => id === newValue.id);
          if (elementExists) {
            task.labels = task.labels.filter(id => id !== newValue.id);
          } else {
            delete newValue.handleName;
            task.labels = [...task.labels, newValue.id];
          }
        }
        if (newValue.handleName === "updateLabel") {
          state.all.map(x => {
            let findOneAndUpdate = x.labels.find(x1 => x1.id === newValue.id);
            if (findOneAndUpdate) {
              findOneAndUpdate.color = newValue.color;
              findOneAndUpdate.text = newValue.text;
            }
            return x;
          });
        }
        if (newValue.handleName === "removeLabel") {
          state.all.map(x => {
            x.labels = x.labels.filter(x1 => x1.id !== newValue.id);
            return x;
          });
        }
        break;
      case "risk":
        task.risk = newValue;
        break;
      case "subTasks":
        if (newValue.handleName === "removeSubTask") {
          task.subTasks = task.subTasks.filter(x => x.id !== newValue.id);
        }
        if (newValue.handleName === "createSubTask") {
          delete newValue.handleName;
          task.subTasks.unshift(newValue);
        }
        break;
      case "notes":
        if (newValue.handleName === "editNote") {
          let note = task.notes.find(x => x.id === newValue.id);
          note.title = newValue.title;
          note.content = newValue.content;
        }
        if (newValue.handleName === "removeNote") {
          task.notes = task.notes.filter(x => x.id !== newValue.id);
        }
        if (newValue.handleName === "createNote") {
          task.notes.push({
            handleName: "createNote",
            id: Math.random(),
            peopleWriter: "Thomas Harvey",
            avatar: "https://icons-for-free.com/free-icons/png/512/628292.png",
            title: newValue.title,
            content: newValue.description,
            createdAt: new Date().toISOString()
          });
          delete newValue.handleName;
          task.notes.unshift(newValue);
        }
        break;
      case "comments":
        task.ticketMessages.unshift(newValue);
        break;
      case "citations":
        if (newValue.handleName === "addCitation") {
          delete newValue.handleName;
          task.dataCitation.push({ id: Math.random(), ...newValue });
        }
        if (newValue.handleName === "updateCitation") {
          delete newValue.handleName;
          task.dataCitation = task.dataCitation.map(x => {
            if (x.id === newValue.id) {
              return { ...x, ...newValue };
            }
            return x;
          });
        }
        if (newValue.handleName === "removeCitation") {
          delete newValue.handleName;
          task.dataCitation = task.dataCitation.filter(
            x => x.id !== newValue.id
          );
        }
        break;
      case "datehappened":
        if (newValue.type === "date") {
          task.limitaion.date = newValue.date;
        } else if (newValue.type === "time") {
          task.limitaion.time = newValue.time;
        }
        break;
      case "statuteOfLimitations":
        task.limitaion.yearLimitation = newValue;
        break;
    }
  },
  removeMembersSuccess(state, data) {
    let index = state.all.findIndex(x => x.id === data.taskId);
    let row = state.all[index];
    row.members = row.members.filter(id => id !== data.newValue.id);
    state.all[index] = row;
  },
  addMemberSuccess(state, data) {
    let index = state.all.findIndex(x => x.id === data.taskId);
    let row = state.all[index];
    row.members = [...row.members, data.newValue];
    state.all[index] = row;
  },
  addCitationInRow(state, data) {
    let index = state.all.findIndex(v => v.id === data.taskId);
    let rowCitation = state.all[index];
    rowCitation.dataCitation = [...rowCitation.dataCitation, data.newValue];
    state.all[index] = rowCitation;
  },
  removeCitationInRow(state, data) {
    let index = state.all.findIndex(x => x.id === data.taskId);
    let rowCitation = state.all[index];
    rowCitation.dataCitation = rowCitation.dataCitation.filter(
      x => x.id !== data.newValue.id
    );
    state.all[index] = rowCitation;
  },
  startLoading(state) {
    state.loading = true;
  },
  stopLoading(state) {
    state.loading = false;
  },
  addMemberRowInGroup(state, data) {
    let index = state.all.findIndex(x => x.id === data.taskId);
    let groupMember = state.all[index];
    let indexPeople = groupMember.people.findIndex(a => a.id === data.group.id);
    let newMembers = groupMember.people[indexPeople].member;
    groupMember.people[indexPeople].member = [...newMembers, data.members];
    state.all[index] = {
      ...groupMember
    };
  },
  selectMember(state, data) {
    let index = state.all.findIndex(a => a.id === data.taskId);
    let groupMember = state.all[index];
    let indexPeople = groupMember.people.findIndex(b => b.id === data.group.id);
    let newMembers = groupMember.people[indexPeople].member;
    let checkMember = newMembers.some(c => c.id === data.memberId);
    if (checkMember) {
      let resultArray = newMembers.filter(d => d.id !== data.memberId);
      groupMember.people[indexPeople].member = [...resultArray];
      state.all[index] = {
        ...groupMember
      };
    }
  },
  deleteGroupPeople(state, data) {
    let index = state.all.findIndex(a => a.id === data.taskId);
    let groupMember = state.all[index];
    let indexPeople = groupMember.people.findIndex(
      b => b.id === data.itemGroup.id
    );
    return groupMember.people.splice(indexPeople, 1);
  },
  addGroupProject(state, data) {
    let index = state.all.findIndex(a => a.id === data.taskId);
    state.all[index].people.push({
      id: Math.random(),
      name: data.itemGroup.groupName,
      member: state.members.dataMembers
        .filter(x => data.itemGroup.members.some(r => r === x.id))
        .map(x => ({ ...x, id: x.id }))
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    members,
    checklist,
    note,
    citation,
    peopleGroup,
    subtask,
    issue
  }
};
