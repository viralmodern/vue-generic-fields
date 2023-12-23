import { sleep } from "./base";
import { dataDocument } from "../mock-data/data-document-client-detail";

async function getDataDocumentClientDetail() {
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
  getDataDocumentClientDetail,
  updateDocument,
  deleteDocument,
  addDocument
}
