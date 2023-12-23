import { sleep } from "./base";
import { dataTaskDetail } from "../mock-data/matter.digitalHoweyChecklist.task.detail";

async function getDataTaskDetail() {
  await sleep();
  return dataTaskDetail;
}

async function updateTaskDetail(data) {
  await sleep();
  return data;
}

export default {
  getDataTaskDetail,
  updateTaskDetail
};
