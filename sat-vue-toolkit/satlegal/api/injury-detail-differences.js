import { sleep } from "./base";
import { dataDifference } from "../mock-data/data-injury-detail-difference";

async function getDataDifference() {
  await sleep();
  return dataDifference;
}
async function updateDataDifference(data) {
  await sleep();
  return data;
}
async function deleteDataDifference(data) {
  await sleep();
  return data;
}

export default {
  getDataDifference,
  updateDataDifference,
  deleteDataDifference
};
