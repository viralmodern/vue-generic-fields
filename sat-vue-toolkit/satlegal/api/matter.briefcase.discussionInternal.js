import { sleep } from "./base";
import data from "../mock-data/project-detail-discussion";

async function getDataThead() {
  await sleep();
  const { threads } = data;
  return threads;
}
async function getdataComments() {
  await sleep();
  const { dataComments } = data;
  return dataComments;
}

export default {
  getDataThead,
  getdataComments
};
