import { sleep } from "./base";
import { dataPrescribes } from "../mock-data/matter.patient.profile.detail.prescribes";

async function getDataPrescribes() {
  await sleep();
  return dataPrescribes;
}

async function addPrescribes(data) {
  await sleep();
  return data;
}

async function updatePrescribes(data) {
  await sleep();
  return data;
}

async function removePrescribes(id) {
  await sleep();
  return id;
}

export default {
  getDataPrescribes,
  addPrescribes,
  updatePrescribes,
  removePrescribes
};
