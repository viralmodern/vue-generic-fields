import { sleep } from "./base";
import { dataLogTag } from "../mock-data/data-log-tag";

async function getDataLogTag() {
  await sleep();
  return dataLogTag;
}
async function addTags(data) {
  await sleep();
  return data;
}

async function updateTags(data) {
  await sleep();
  return data;
}

async function removeTags(data) {
  await sleep();
  return data;
}

export default {
  getDataLogTag,
  addTags,
  updateTags,
  removeTags
};
