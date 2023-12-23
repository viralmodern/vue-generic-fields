import { sleep } from "./base";
import { dataInjury } from "../mock-data/data-injury.detail";

async function getDataInjuryDetail() {
  await sleep();

  return dataInjury;
}

async function updateInjury(data) {
  await sleep();
  return data;
}

export default {
  getDataInjuryDetail,
  updateInjury
};
