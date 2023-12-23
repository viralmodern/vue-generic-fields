import { sleep } from "./base";
import { dataInvoice } from "../mock-data/workspace.billing.invoice";

async function getDataInvoice() {
  await sleep();
  return dataInvoice;
}

async function addDataInvoice(data) {
  await sleep();
  return data;
}

async function updateDataInvoice(data) {
  await sleep();
  return data;
}

async function deleteDataInvoice(id) {
  await sleep();
  return id;
}

export default {
    getDataInvoice,
    addDataInvoice,
    updateDataInvoice,
    deleteDataInvoice
};
