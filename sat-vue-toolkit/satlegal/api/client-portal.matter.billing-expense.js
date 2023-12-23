import { sleep } from "./base";
import { dataExpense } from "../mock-data/data-briefcase-expense";
async function getExpense() {
  await sleep();
  return JSON.parse(JSON.stringify(dataExpense));
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
  data.id = Math.random();
  data.receipt = [];
  return data;
}

export default {
  getExpense,
  updateExpense,
  deleteExpense,
  addExpense
};
