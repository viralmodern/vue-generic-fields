import { sleep } from "./base";
import data from "../mock-data/project-contacts-detail.js";

async function getDataGeneralInfo() {
  await sleep();
  const { dataGeneralInfo } = data;
  return dataGeneralInfo;
}

async function getDataWork() {
  await sleep();
  const { dataWork } = data;
  return dataWork;
}

async function getDataContact() {
  await sleep();
  const { dataContact } = data;
  return dataContact;
}

async function getDataListNotes() {
  await sleep();
  const { listNotes } = data;
  return listNotes;
}

async function addNote(itemNote) {
  await sleep();
  return itemNote;
}

async function removeItemNote(idNote) {
  await sleep();
  return idNote;
}
async function getDataListDocument() {
  await sleep();
  const { dataTableDocument } = data;
  return dataTableDocument;
}
export default {
  getDataGeneralInfo,
  getDataWork,
  getDataContact,
  getDataListNotes,
  addNote,
  removeItemNote,
  getDataListDocument
};
