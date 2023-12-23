import { sleep } from "./base";
import { dataAbout } from "../mock-data/data-profile-character-detail-about";

async function getDataOverView() {
  await sleep();
  return JSON.parse(JSON.stringify(dataAbout));
}

async function updateGeneralInfo(data) {
  await sleep()
  return data;
}

async function updateContact(data) {
  await sleep()
  return data;
}

async function updateWork(data) {
  await sleep()
  return data;
}

export default {
  getDataOverView,
  updateGeneralInfo,
  updateWork,
  updateContact
};
