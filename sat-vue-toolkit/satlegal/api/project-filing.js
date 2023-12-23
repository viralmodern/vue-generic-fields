import { sleep } from "./base";
import data from "../mock-data/project-filing";

async function getDataListGroupFiling() {
  await sleep();
  const { dataListGroup } = data;
  return dataListGroup
}

async function changeStatusListGroupFiling() {
  await sleep();
  return {
    status: true
  }
}

export default {
  getDataListGroupFiling,
  changeStatusListGroupFiling

};
