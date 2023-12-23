import { sleep } from "./base";
import { dataChartOfSummary } from "../mock-data/data-billing-summary";

async function getDataChartSummary() {
  await sleep();
  return dataChartOfSummary
}

export default {
  getDataChartSummary
}
