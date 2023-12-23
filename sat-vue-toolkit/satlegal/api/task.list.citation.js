import { sleep } from "./base";

async function addDataCitation() {
  await sleep();
  return {
    status: true,
    message: "Create Success!"
  };
}

async function updateDataCitation() {
  await sleep();
  return {
    status: true,
    message: "Update Success!"
  };
}

async function deleteDataCitation() {
  await sleep();
  return {
    status: true,
    message: "Delete Success!"
  };
}

export default {
  addDataCitation,
  updateDataCitation,
    deleteDataCitation
};
