import { sleep } from "./base"
import { curentExpense } from "../mock-data/matter.discovery.status.requestTask.curentExpence";

async function getDataCurentExpense() {
  await sleep();
  return curentExpense;
}

async function addCurentExpense(data) {
  await sleep();
  return data;
}
async function updateCurentExpense(data) {
  await sleep();
  return data;
}
async function removeCurentExpense(data) {
  await sleep();
  return data;
}

export default {
  getDataCurentExpense,
  addCurentExpense,
  updateCurentExpense,
  removeCurentExpense
}
