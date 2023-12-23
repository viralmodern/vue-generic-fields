import { sleep } from "./base"
import { dataSummary } from "../mock-data/data-matter-discovery-summary";

async function getDataDiscoverySummary() {
  await sleep()
  return dataSummary
}

async function addGroupChecklist(data) {
  await sleep();
  return data;
}

async function removeGroupChecklist(data) {
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
  getDataDiscoverySummary,
  addGroupChecklist,
  removeGroupChecklist,
  addItemInGroupChecklist,
  removeItemInGroupChecklist,
  updateItemInGroupChecklist,
  checkItem
}
