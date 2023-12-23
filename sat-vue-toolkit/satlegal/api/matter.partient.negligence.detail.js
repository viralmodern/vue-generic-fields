import { sleep } from "./base";
import { dataNegligence } from "../mock-data/data-negligence.detail";

async function getDataNegligenceDetail() {
  await sleep();

  return dataNegligence;
}

async function updateNegligence(data) {
  await sleep();
  return data;
}

export default {
  getDataNegligenceDetail,
  updateNegligence
};
