import { sleep } from "./base";
import { dataPayment } from "../mock-data/data-billing-invoice-detail-payment";
async function getdataPayment() {
  await sleep();
  return dataPayment;
}
async function updatePayment(data) {
  await sleep();
  return data;
}
async function addPayment(data) {
  await sleep();
  return data;
}
export default {
  getdataPayment,
  updatePayment,
  addPayment
};
