import { clientDetail } from "../mock-data/data-client-detail";
import { sleep } from "./base"

async function getDataClientDetail() {
  await sleep();
  return clientDetail
}
async function updateAvatar(url) {
  await sleep();
  return url
}
async function changeDescription(data) {
  await sleep();
  return data
}

export default {
  getDataClientDetail,
  updateAvatar,
  changeDescription
}
