import { sleep } from "./base"
import { dataIndexDetail } from "../mock-data/data-discovery-index-detail";

async function getDataIndexDetail(id) {
  await sleep(id);
  const numberId = id % 3;
  switch (numberId) {
    case 0:
      dataIndexDetail.nameTab = "Index Document";
      break;
    case 1:
      dataIndexDetail.nameTab = "Index Audio";
      break;
    default:
      dataIndexDetail.nameTab = "Index Photo";
      break;
  }
  return dataIndexDetail;
}

async function updateIndexDetail(data) {
  await sleep();
  return data
}

async function addItemTerminology(data) {
  await sleep();
  return data
}

async function addSupportRequest(data) {
  await sleep();
  return data;
}

async function addSubItemInTabel(data) {
  await sleep();
  return data
}

async function addItemPhotoRequest(data) {
  await sleep();
  return data;
}

async function addSubPhotoInTabel(data) {
  await sleep();
  return data
}

async function deleteItemAudio(obj) {
  await sleep();
  return obj;
}

async function changeColor(color) {
  await sleep();
  return color;
}

async function updateAudio(o) {
  await sleep();
  return o
}

async function createNewAudioText(o) {
  await sleep();
  return o;
}

export default {
  getDataIndexDetail,
  updateIndexDetail,
  addItemTerminology,
  addSupportRequest,
  addSubItemInTabel,
  addItemPhotoRequest,
  addSubPhotoInTabel,
  deleteItemAudio,
  changeColor,
  updateAudio,
  createNewAudioText
}
