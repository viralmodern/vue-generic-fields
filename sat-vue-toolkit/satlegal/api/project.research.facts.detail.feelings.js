import { sleep } from "./base";
import { dataFeelings } from "../mock-data/data-research-facts-detail-feelings";

async function getDataFeelings() {
  await sleep();
  return dataFeelings;
}

export default {
  getDataFeelings
};
