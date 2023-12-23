import { sleep } from "./base";
import { invoiceDetail } from "../mock-data/data-invoice-detail";
async function getInvoiceDetail() {
  await sleep();
  return invoiceDetail;
}
export default {
  getInvoiceDetail
};
