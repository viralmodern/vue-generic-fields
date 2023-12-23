import { sleep } from "./base";
import {listNotes} from '../mock-data/data-matter-note'
async function getListNote() {
  await sleep();
  return listNotes
}
async function createNote(data) {
  await sleep();
  return data
}
async function editNote(data){
  await sleep();
  return data
}
async function removeNote(id){
  await sleep();
  return id
}

export default {
  getListNote,
  createNote,
  editNote,
  removeNote
};
