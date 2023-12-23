import { sleep } from "./base";

async function getDataAttachment() {
  await sleep();
  return [];
}

async function uploadAttachment(data) {
  await sleep();
  return data;
}

async function removeAttachment(data) {
  await sleep();
  return data;
}

async function updateRateAttachment(data) {
  await sleep();
  return data;
}

export default {
  getDataAttachment,
  uploadAttachment,
  removeAttachment,
  updateRateAttachment
};
