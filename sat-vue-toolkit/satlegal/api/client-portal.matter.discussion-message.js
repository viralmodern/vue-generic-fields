import { sleep } from "./base";
import { messages } from "../mock-data/data-briefcase-discussion-message";

async function getPortalMessage() {
  await sleep();
  return JSON.parse(JSON.stringify(messages));
}
async function updatePortalMessage(data) {
  await sleep();
  return data;
}
async function deletePortalMessage(data) {
  await sleep();
  return data;
}
async function addPortalMessage(data) {
  await sleep();
  return data;
}

export default {
  getPortalMessage,
  updatePortalMessage,
  deletePortalMessage,
  addPortalMessage
};
