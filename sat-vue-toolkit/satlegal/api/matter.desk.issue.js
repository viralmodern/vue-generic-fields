import { sleep } from "./base";
import { dataDeskIssue } from "../mock-data/matter.desk.issue";

async function getDataDeskIssue() {
  await sleep();
  return dataDeskIssue;
}

async function addDeskIssue(data) {
  await sleep();
  return data;
}

async function updateDeskIssue(data) {
  await sleep();
  return data;
}

async function choseTag(data) {
  await sleep();
  return data;
}

async function removeDeskIssue(data) {
  await sleep();
  return data;
}

export default {
  getDataDeskIssue,
  addDeskIssue,
  updateDeskIssue,
  choseTag,
  removeDeskIssue
};
