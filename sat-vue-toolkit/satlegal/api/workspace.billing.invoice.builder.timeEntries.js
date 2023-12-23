import { sleep } from "./base";

async function getDataInvoiceTimeEntries() {
  await sleep();
  return [
    {
      id: 1,
      timeEntry: 2,
      description: "Lorem Isum",
      date: "2019-06-02T14:22:50.564Z",
      billedBy: 1,
      hours: "20:00",
      rate: 25
    },
    {
      id: 2,
      timeEntry: 1,
      description: "Lorem Isum",
      date: "2019-06-02T14:22:50.564Z",
      billedBy: 2,
      hours: "23:00",
      rate: 50
    },
    {
      id: 3,
      timeEntry: 1,
      description: "Lorem Isum",
      date: "2019-06-02T14:22:50.564Z",
      billedBy: 1,
      hours: "10:00",
      rate: 75
    }
  ];
}

async function addInvoiceTimeEntries(data) {
  await sleep();
  return data;
}

async function updateInvoiceTimeEntries(data) {
  await sleep();
  return data;
}

async function removeInvoiceTimeEntries(id) {
  await sleep();
  return id;
}

export default {
  getDataInvoiceTimeEntries,
  addInvoiceTimeEntries,
  updateInvoiceTimeEntries,
  removeInvoiceTimeEntries
};
