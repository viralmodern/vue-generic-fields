import { dataMatterCitations } from "../mock-data/data-citations";
import { sleep } from "./base";


async function getDataCitationsFromApi() {
  await sleep();
  return dataMatterCitations;
}

async function addDataCitations(data) {
  await sleep();
  return data;
}

async function addGroupCelebrity(data) {
  await sleep();
  return data;
}
async function checkItemCelebrity(data) {
  await sleep();
  return data;
}
async function addItemInGroupCelebrity(data) {
  await sleep();
  return data;
}
async function removeGroupCelebrity(data) {
  await sleep();
  return data;
}
async function removeItemInGroupCelebrity(data) {
  await sleep();
  return data;
}
async function updateItemInGroupCelebrity(data) {
  await sleep();
  return data;
}

export default {
  getDataCitationsFromApi,
  addDataCitations,
  // Celebrity
  addGroupCelebrity,
  checkItemCelebrity,
  addItemInGroupCelebrity,
  removeGroupCelebrity,
  removeItemInGroupCelebrity,
  updateItemInGroupCelebrity
}
