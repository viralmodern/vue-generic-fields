import { sleep } from "./base";
import { dataMatterRACI } from "../mock-data/matter.RACI";

async function getDataMatterRACI() {
  await sleep();
  return dataMatterRACI;
}

export default {
  getDataMatterRACI,
};
