import { sleep } from "./base";
import { dataInvoiceBuilder } from "../mock-data/workspace.billing.invoice.builder";

async function getDataInvoiceBuilder() {
  await sleep();
  return dataInvoiceBuilder;
}
async function updateDataInvoiceBuilder(data) {
  await sleep();
  return data;
}

export default {
  getDataInvoiceBuilder,
  updateDataInvoiceBuilder
};
