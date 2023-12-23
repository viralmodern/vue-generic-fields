import { sleep } from "./base";

async function addSubTask() {
  await sleep();
  return {
    status: true,
    message: "Add subtask success!"
  };
}

async function removeSubTask() {
  await sleep();
  return {
    status: true,
    message: "Delete subtask success!"
  };
}

export default {
  addSubTask,
  removeSubTask
};
