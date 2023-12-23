import { sleep } from "./base";
import {
  currentPlan,
  availablePlans,
  dataBilling,
  listCurrency
} from "../mock-data/setting.billing";
async function getCurrentPlan() {
  await sleep();
  return currentPlan;
}

async function getAvailablePlans() {
  await sleep();
  return availablePlans;
}

async function getDataBilling() {
  await sleep();
  return dataBilling;
}

async function deleteCreditCard(data) {
  await sleep();
  return data;
}

async function deleteCardPayment(data) {
  await sleep();
  return data;
}

async function postChangeAvatar(data) {
  await sleep();
  return data;
}

async function postDeleteCreditCard(data) {
  await sleep();
  return data;
}

async function getDataListCurrency() {
  await sleep();
  return listCurrency;
}

async function postCreatePayment(data) {
  await sleep();
  return data;
}
export default {
  getCurrentPlan,
  getAvailablePlans,
  getDataBilling,
  deleteCreditCard,
  deleteCardPayment,
  postChangeAvatar,
  postDeleteCreditCard,
  getDataListCurrency,
  postCreatePayment
};
