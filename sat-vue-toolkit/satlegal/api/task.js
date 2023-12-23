import { sleep } from "./base";
import data from "../mock-data/tasks";
async function getTaskOfProject() {
  await sleep();
  const { dataTask } = data
  return {
    totals: 100,
    dataTask
  };
}
async function getListTask() {
  await sleep();
  const { dataTaskAssignedToMe } = data
  return {
    totals: 100,
    dataTaskAssignedToMe
  };
}
async function getListTaskManageByMe() {
  await sleep();
  const { dataTaskAssignedToMe } = data
  return {
    totals: 100,
    dataTaskAssignedToMe
  };
}

export default { getTaskOfProject, getListTask, getListTaskManageByMe };
