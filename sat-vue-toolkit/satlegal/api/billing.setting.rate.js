import { sleep } from "./base";
import { dataRate } from "../mock-data/data-billing-rate";
async function getRate() {
  await sleep();
  return dataRate;
}
async function updateSettingRate(data) {
  await sleep();
  return data;
}
async function deleteRate(data) {
  await sleep();
  return data;
}
async function addRate(data) {
  await sleep();
  return data;
}

export default {
  getRate,
  updateSettingRate,
  deleteRate,
  addRate
};
