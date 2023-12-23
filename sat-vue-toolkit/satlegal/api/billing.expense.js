import { sleep } from "./base";
import { dataExpense } from "../mock-data/data.billing.expense";
async function getExpense() {
  await sleep();
  return dataExpense;
}
async function updateExpense(data) {
  await sleep();
  return data;
}
async function deleteExpense(data) {
  await sleep();
  return data;
}
async function addExpense(data) {
  await sleep();
  return data;
}

export default {
  getExpense,
  updateExpense,
  deleteExpense,
  addExpense
};
