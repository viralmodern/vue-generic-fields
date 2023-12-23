import { sleep } from "./base";
import { dataProximate } from "../mock-data/data-injury-detail-proximate";

async function getDataProximate() {
  await sleep();
  return dataProximate;
}
async function updateDataProximate(data) {
  await sleep();
  return data;
}
async function deleteDataProximate(data) {
  await sleep();
  return data;
}

export default {
  getDataProximate,
  updateDataProximate,
  deleteDataProximate
};
