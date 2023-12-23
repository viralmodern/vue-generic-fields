import { sleep } from "./base";
import { filterResult, all, listBoard } from "../mock-data/task.list";
import data from "../mock-data/task-detail";

async function getDataListBoard() {
  await sleep();
  return listBoard;
}

async function addBoard(data) {
  await sleep();
  return data;
}

async function filterTasks() {
  await sleep();
  return filterResult;
}

async function updateTask() {
  await sleep();
  return true;
}

async function getDataMemberTask() {
  await sleep();
  const { dataMemberProject } = data;
  return dataMemberProject;
}

async function postCreateMember(data) {
  await sleep();
  return data;
}

async function postRemoveMember(data) {
  await sleep();
  return data;
}

async function postRemoveItemOftreeCard(data) {
  await sleep();
  return data;
}

async function getAllTaskStages() {
  await sleep();
  return [
    {
      id: 19812,
      name: "Backlog",
      alias: "backlog"
    },
    {
      id: 19813,
      name: "Todo",
      alias: "todo"
    },
    {
      id: 19814,
      name: "Doing",
      alias: "doing"
    },
    {
      id: 19815,
      name: "Verifying",
      alias: "verifying"
    },
    {
      id: 19816,
      name: "Done",
      alias: "done"
    }
  ];
}

async function getAllTasks() {
  await sleep();
  return all;
}

async function postAddTaskBoard(data) {
  await sleep();
  return data;
}

async function postAddItemTaskBoard(data) {
  await sleep();
  return data;
}

async function postAddSubTaskBoard(data) {
  await sleep();
  return data;
}

export default {
  filterTasks,
  updateTask,
  getDataMemberTask,
  postCreateMember,
  postRemoveMember,
  getAllTaskStages,
  getAllTasks,
  postRemoveItemOftreeCard,
  postAddTaskBoard,
  postAddItemTaskBoard,
  postAddSubTaskBoard,
  getDataListBoard,
  addBoard
};
