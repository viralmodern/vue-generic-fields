import { sleep } from "./base";
import { dataTableDocument } from "../mock-data/data-table-document";

async function getDataTableDocument() {
  await sleep();
  return dataTableDocument;
}

export default {
  getDataTableDocument
};
