import { sleep } from "./base";
import { dataClient } from "../mock-data/workspace.client";

async function getDataClient() {
  await sleep();
  return dataClient;
}

async function updateDataClient(data) {
  await sleep();
  return data;
}

async function createNewClient(newClient) {
  await sleep();
  return newClient;
}

export default {
  getDataClient,
  updateDataClient,
  createNewClient
};
