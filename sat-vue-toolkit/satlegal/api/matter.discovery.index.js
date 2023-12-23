import { sleep } from "./base"
import { dataIndexDiscovery } from "../mock-data/data-discovery-index";

async function getDataIndexDiscovery() {
  await sleep();
  return dataIndexDiscovery;
}

async function createItemIndex(data) {
  await sleep();
  return data;
}

export default {
  getDataIndexDiscovery,
  createItemIndex
}
