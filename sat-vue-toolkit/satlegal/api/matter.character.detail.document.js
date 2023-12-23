import { sleep } from "./base";
import { dataTableDocument } from "../mock-data/data-profile-character-detail-document";
async function getDataDocument() {
  await sleep();
  return dataTableDocument;
}

export default {
  getDataDocument
};
