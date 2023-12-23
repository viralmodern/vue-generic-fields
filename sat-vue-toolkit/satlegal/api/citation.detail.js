import { sleep } from "./base";
import { dataCitationDetail } from "../mock-data/data-citation-detail";

async function getCitationDetail() {
  await sleep();
  return dataCitationDetail;
}
async function updateCitaions(data) {
  await sleep();
  return data;
}

export default {
  getCitationDetail,
  updateCitaions
}
