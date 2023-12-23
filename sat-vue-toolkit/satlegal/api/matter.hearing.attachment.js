import { sleep } from "./base";

async function uploadAttachment() {
  await sleep();
  return {
    status: true,
    message: "Upload attachment success!"
  };
}

async function removeAttachment() {
  await sleep();
  return {
    status: true,
    message: "Delete attachment success!"
  };
}

async function updateRateAttach() {
  await sleep();
  return {
    status: true,
    message: "Update rate success!"
  };
}

export default {
  uploadAttachment,
  removeAttachment,
  updateRateAttach
};
