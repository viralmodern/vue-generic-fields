import { sleep } from "./base";

async function getCheckList() {
  await sleep();
  return [];
}

async function addGroupChecklist(data) {
  await sleep();
  return data;
}

async function deleteGroupChecklist(data) {
  await sleep();
  return data;
}

async function addItemInGroupChecklist(data) {
  await sleep();
  return data;
}

async function removeItemInGroupChecklist(data) {
  await sleep();
  return data;
}

async function updateItemInGroupChecklist(data) {
  await sleep();
  return data;
}

async function checkItem(data) {
  await sleep();
  return data;
}

export default {
  getCheckList,
  addGroupChecklist,
  deleteGroupChecklist,
  addItemInGroupChecklist,
  removeItemInGroupChecklist,
  updateItemInGroupChecklist,
  checkItem
};
