import { sleep } from "./base";
import { dataRelatedFacts } from "../mock-data/matter.citations.issue.detail.relatedFacts";

async function getDataRelatedFacts() {
  await sleep();
  return dataRelatedFacts;
}

async function addRelatedFacts(data) {
  await sleep();
  return data;
}

async function updateRelatedFacts(data) {
  await sleep();
  return data;
}

async function removeRelatedFacts(id) {
  await sleep();
  return id;
}

export default {
  getDataRelatedFacts,
  addRelatedFacts,
  updateRelatedFacts,
  removeRelatedFacts
};
