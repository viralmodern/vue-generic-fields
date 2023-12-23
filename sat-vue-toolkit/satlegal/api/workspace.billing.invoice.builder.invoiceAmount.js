import { sleep } from "./base";

async function getDataInvoiceAmount() {
  await sleep();
  return [
    {
      id: 1,
      name: "Lawsuit 1",
      quantity: 1,
      price: 2000,
      discount: 23,
      tax: 20
    },
    {
      id: 2,
      name: "Lawsuit 2",
      quantity: 1,
      price: 1000,
      discount: 17,
      tax: 0
    },
    {
      id: 3,
      name: "Lawsuit 3",
      quantity: 4,
      price: 300,
      discount: 25,
      tax: 2
    }
  ];
}

async function addInvoiceAmount(data) {
  await sleep();
  return data;
}

async function updateInvoiceAmount(data) {
  await sleep();
  return data;
}

async function removeInvoiceAmount(id) {
  await sleep();
  return id;
}

export default {
  getDataInvoiceAmount,
  addInvoiceAmount,
  updateInvoiceAmount,
  removeInvoiceAmount
};
