import { sleep } from "./base";
import { dataCaseBrief } from "../mock-data/data-case-brief";

async function getDataCaseBrief() {
  await sleep();
  return JSON.parse(JSON.stringify(dataCaseBrief))
}

export default {
  getDataCaseBrief
}
