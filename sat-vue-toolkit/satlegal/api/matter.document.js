import { sleep } from "./base";
import { dataDocument } from "../mock-data/data-matter-document"

async function getDataDocument() {
  await sleep();
  return dataDocument;
}

export default {
  getDataDocument
}
