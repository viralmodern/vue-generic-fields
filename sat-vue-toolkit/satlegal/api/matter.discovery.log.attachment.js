import { sleep } from "./base";
import { listAttachments } from "../mock-data/data-discovery-log-attachment";

async function getDataAttachment() {
  await sleep();
  return listAttachments;
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
