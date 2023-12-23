import { sleep } from "./base";
import { dataAbout } from "../mock-data/data-profile-character-detail-about";
import news from '../mock-data/news-feed';

async function getDataActivities(id) {
  await sleep(id);
  return news;
}

async function getDataOverView() {
  await sleep();
  return dataAbout;
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
  updateContact,
  getDataActivities
};
