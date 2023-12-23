import { sleep } from "./base";
import { listNotes } from "../mock-data/data-billing-invoice-detail-note";
async function getListNotes() {
  await sleep();
  return listNotes;
}
async function addNote(data) {
  await sleep();
  return data
}
async function editNote(data) {
  await sleep();
  return data
}
async function removeNote(id) {
  await sleep();
  return id
}
export default {
  getListNotes,
  addNote,
  editNote,
  removeNote
};
