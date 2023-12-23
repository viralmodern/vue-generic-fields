import { sleep } from "./base";
import { dataPracticeDetail } from "../mock-data/data-practice.detail";

async function getDataPracticeDetail() {
  await sleep();

  return dataPracticeDetail;
}

async function updatePractice(data) {
  await sleep();
  return data;
}

export default {
  getDataPracticeDetail,
  updatePractice
};
