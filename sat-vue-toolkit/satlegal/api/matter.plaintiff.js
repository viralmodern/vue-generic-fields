import { dataPlaintiff } from "../mock-data/data-matter-plaintiff";
import { sleep } from "./base"

async function getDataPlaintiff() {
  await sleep();
  return dataPlaintiff;
}
async function createPlaintiff(data) {
  await sleep();
  return data;
}

export default {
  getDataPlaintiff,
  createPlaintiff
}
