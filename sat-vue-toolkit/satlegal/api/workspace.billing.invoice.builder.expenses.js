import { sleep } from "./base";

async function getDataInvoiceExpenses() {
  await sleep();
  return [
    {
      id: 1,
      expense: 2,
      description: "Lorem Isum",
      date: "2019-06-02T14:22:50.564Z",
      billedBy: 1,
      quantity: 20,
      price: 2000
    },
    {
      id: 2,
      expense: 1,
      description: "Lorem Isum",
      date: "2019-06-02T14:22:50.564Z",
      billedBy: 2,
      quantity: 0,
      price: 2000
    },
    {
      id: 3,
      expense: 1,
      description: "Lorem Isum",
      date: "2019-06-02T14:22:50.564Z",
      billedBy: 1,
      quantity: 2,
      price: 2000
    }
  ];
}

async function addInvoiceExpenses(data) {
  await sleep();
  return data;
}

async function updateInvoiceExpenses(data) {
  await sleep();
  return data;
}

async function removeInvoiceExpenses(id) {
  await sleep();
  return id;
}

export default {
  getDataInvoiceExpenses,
  addInvoiceExpenses,
  updateInvoiceExpenses,
  removeInvoiceExpenses
};
