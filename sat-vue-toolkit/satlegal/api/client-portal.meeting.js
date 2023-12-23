import { sleep } from "./base";
import { dataAgenda } from "../mock-data/data-detail-project-meeting";
import data from "../mock-data/data-meeting";

async function getDataPortalMeetingAgenda() {
  await sleep();
  return dataAgenda;
}

async function addPortalMeetingAgenda(data) {
  await sleep();
  return data;
}

async function getDataMeetingWeekly() {
  await sleep();
  const { dataMeetingWeekly } = data;
  return dataMeetingWeekly
}

export default {
  getDataPortalMeetingAgenda,
  addPortalMeetingAgenda,
  getDataMeetingWeekly
};
