import { sleep } from "./base";
import { dataNotes } from "../mock-data/data-client-note";

async function getDataNote() {
  await sleep();
  return dataNotes;
}
async function updateDataNote(data) {
  await sleep();
  return data;
}
async function deleteDataNote(data) {
  await sleep();
  return data;
}
async function addDataNote(data) {
  await sleep();
  return data;
}

export default {
  getDataNote,
  updateDataNote,
  deleteDataNote,
  addDataNote
};
