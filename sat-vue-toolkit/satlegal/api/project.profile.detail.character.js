import { sleep } from "./base";
import { dataProfileCharacter } from "../mock-data/data-profile-character-detail";

async function getDataDetailProfileCharacter() {
  await sleep();
  return dataProfileCharacter
}

async function updateAvatar(url) {
  await sleep();
  return url
}

function changeDescription(data) {
  return data;
}

async function addMappingSupport(data) {
  await sleep();
  return data;
}

async function addSupportRequest(data) {
  await sleep();
  return data
}

async function updateTaskSupport(data) {
  await sleep();
  return data;
}

async function addSubItemInTabel(data) {
  await sleep();
  return data;
}

export default {
  getDataDetailProfileCharacter,
  updateAvatar,
  changeDescription,
  addMappingSupport,
  addSupportRequest,
  updateTaskSupport,
  addSubItemInTabel
}
