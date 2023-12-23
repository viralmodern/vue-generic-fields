import api from "../../api/matter.digitalHoweyChecklist";
import note from "./matter.digitalHoweyChecklist.task.note";
import attachment from "./matter.digitalHoweyChecklist.task.attachment";
import comment from "./matter.digitalHoweyChecklist.task.comment";
import detail from "./matter.digitalHoweyChecklist.task.detail";
import worklog from "./matter.digitalHoweyChecklist.task.worklog";
import labels from "./matter.digitalHoweyChecklist.labels";
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
        .map(x => dateWithoutHours(x.dueDate))
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
          duration: durationFromStartToEnd(task.startDate, task.dueDate),
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
            x => moment(x.dueDate).format("YYYY-MM-DD") == filter.value
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
  async getAllTaskStages({ commit }) {
    commit("populateTaskStages", await api.getAllTaskStages());
  },
  async removeItemOfTreeCard({ commit }, id) {
    commit("deleteItemOfTreeCard", await api.postRemoveItemOftreeCard(id));
  },
  async updateTask2Request({ commit }, data) {
    commit("updateTask2", data);
    return data;
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
  deleteItemOfTreeCard(state, id) {
    state.all = state.all.filter(x => x.id !== id);
  },
  toggleStage(state, stageId) {
    if (state.selectedStages.some(x => x === stageId)) {
      const index = state.selectedStages.indexOf(stageId);
      state.selectedStages.splice(index, index + 1);
    } else {
      state.selectedStages.push(stageId);
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
    note,
    attachment,
    comment,
    labels,
    detail,
    worklog
  }
};
