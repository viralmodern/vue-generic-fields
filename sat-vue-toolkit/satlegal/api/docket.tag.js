import { sleep } from "./base";
import { tags } from "../mock-data/data-tag-docket";

async function getDataTagDocket() {
  await sleep();
  return tags;
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
  getDataTagDocket,
  addTags,
  updateTags,
  choseTag,
  removeTags
};
