import { sleep } from "./base";
import { dataPayment } from "../mock-data/matter.briefcase.billing.payment";
async function getPayment() {
  await sleep();
  return dataPayment;
}
async function updatePayment(data) {
  await sleep();
  return data;
}
async function deletePayment(data) {
  await sleep();
  return data;
}
async function addPayment(data) {
  await sleep();
  return data;
}

export default {
  getPayment,
  updatePayment,
  deletePayment,
  addPayment
};
