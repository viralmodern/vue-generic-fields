import { sleep } from "./base";
import { dataMatterHearing } from "../mock-data/matter-hearing";

async function getDataMatterHearing() {
  await sleep();
  return dataMatterHearing;
}

async function createMatterHearing(data) {
  await sleep();
  return data;
}

async function updateMatterHearing(data) {
  await sleep();
  return data;
}

async function addTaskMatterHearing(data) {
  await sleep();
  return data;
}

export default {
  getDataMatterHearing,
  createMatterHearing,
  updateMatterHearing,
  addTaskMatterHearing
};
