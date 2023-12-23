import { sleep } from "./base";
import { messages } from "../mock-data/data-message-client";

async function getMessageClient() {
  await sleep();
  return messages;
}
async function updateMessageClient(data) {
  await sleep();
  return data;
}
async function deleteMessageClient(data) {
  await sleep();
  return data;
}
async function addMessageClient(data) {
  await sleep();
  return data;
}

export default {
  getMessageClient,
  updateMessageClient,
  deleteMessageClient,
  addMessageClient
}
