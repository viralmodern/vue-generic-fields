import { sleep } from "./base";
import { dataDocument } from "../mock-data/data-briefcase-discussion-document";

async function getDataDocument() {
  await sleep();
  return dataDocument;
}
async function updateDocument(data) {
  await sleep();
  return data;
}
async function deleteDocument(data) {
  await sleep();
  return data;
}
async function addDocument(data) {
  await sleep();
  return data;
}

export default {
  getDataDocument,
  updateDocument,
  deleteDocument,
  addDocument
}
