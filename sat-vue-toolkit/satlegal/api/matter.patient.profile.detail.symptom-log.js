import { sleep } from "./base";
import { dataSymptomLog } from "../mock-data/matter.patient.profile.detail.symptom-log";

async function getDataSymptomLog() {
  await sleep();
  return dataSymptomLog;
}

async function addSymptomLog(data) {
  await sleep();
  return data;
}

async function updateSymptomLog(data) {
  await sleep();
  return data;
}

async function removeSymptomLog(id) {
  await sleep();
  return id;
}

export default {
  getDataSymptomLog,
  addSymptomLog,
  updateSymptomLog,
  removeSymptomLog
};
