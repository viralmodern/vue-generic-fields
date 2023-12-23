import { sleep } from "./base";
import { dataChartOfSummary } from "../mock-data/data-billing-summary";

async function getDataChartSummary() {
  await sleep();
  return JSON.parse(JSON.stringify(dataChartOfSummary))
}

export default {
  getDataChartSummary
}
