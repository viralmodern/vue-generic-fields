import { dataLabelIssue } from "../mock-data/data-citation-issue";
import { sleep } from "./base";

async function getDataLabelIssue() {
  await sleep();
  return dataLabelIssue
}
async function addLabelsIssue(data) {
  await sleep();
  return data
}
async function updateLabelsIssue(data) {
  await sleep();
  return data
}
async function removeLabelsIssue(data) {
  await sleep();
  return data
}

export default {
  getDataLabelIssue,
  addLabelsIssue,
  updateLabelsIssue,
  removeLabelsIssue
}
