import { sleep } from "./base";
import { dataSideEffects } from "../mock-data/matter.patient.profile.detail.prescribes.detail.sideEffects";

async function getDataSideEffects() {
  await sleep();
  return dataSideEffects;
}

async function addSideEffects(data) {
  await sleep();
  return data;
}

async function updateSideEffects(data) {
  await sleep();
  return data;
}

async function removeSideEffects(id) {
  await sleep();
  return id;
}

export default {
  getDataSideEffects,
  addSideEffects,
  updateSideEffects,
  removeSideEffects
};
