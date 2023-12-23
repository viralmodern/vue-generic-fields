import { sleep } from "./base";
import { dataTag } from "../mock-data/matter.discovery.toolbox.tag";

async function getDataTags() {
  await sleep();
  return JSON.parse(JSON.stringify(dataTag));
}

async function addTags(data) {
  await sleep();
  return data;
}

async function updateTags(data) {
  await sleep();
  return data;
}

async function choseTag(data) {
  await sleep();
  return data;
}

async function removeTags(data) {
  await sleep();
  return data;
}

export default {
  getDataTags,
  addTags,
  updateTags,
  choseTag,
  removeTags
};
