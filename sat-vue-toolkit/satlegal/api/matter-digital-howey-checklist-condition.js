import { dataCondition } from "../mock-data/data-digital-howey-checklist-condition";
import { sleep } from "./base";

async function getDatadataCondition() {
  await sleep();
  return dataCondition
}
async function editDescription(data) {
  await sleep();
  return data
}
async function updateCondition(data) {
  await sleep();
  return data
}
async function removeCondition(data) {
  await sleep();
  return data
}
export default {
  getDatadataCondition,
  editDescription,
  updateCondition,
  removeCondition
}
