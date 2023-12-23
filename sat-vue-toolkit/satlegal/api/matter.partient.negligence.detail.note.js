import { sleep } from "./base";
async function getListNote() {
  await sleep();
  return []
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
  getListNote,
  addNote,
  editNote,
  removeNote
};
