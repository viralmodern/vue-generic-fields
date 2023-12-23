import { sleep } from "./base";
import {
  dataDocumentDetail,
  dataDocumentHistory
} from "../mock-data/document-detail";

async function getDataDocumentDetail(id) {
  // eslint-disable-next-line
  console.log("documentRequestDetail", id);
  await sleep();
  return dataDocumentDetail;
}
async function getDataDocumentHistoryDetail() {
  await sleep();
  return dataDocumentHistory;
}

export default {
  getDataDocumentDetail,
  getDataDocumentHistoryDetail
};
