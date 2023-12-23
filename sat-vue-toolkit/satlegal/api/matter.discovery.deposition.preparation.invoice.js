import { sleep } from "./base";
import { dataInvoice } from "../mock-data/matter.discovery.deposition.preparation.invoice";

async function getDataInvoice({ searchObject = {} }) {
  let results = dataInvoice;
  const convertArray = Object.keys(searchObject);
  if (!convertArray.includes("all")) {
    convertArray.forEach(key => {
      results = results.filter(x => {
        if (Array.isArray(x[key])) {
          return x[key].includes(searchObject[key]);
        } else {
          return x[key] === searchObject[key];
        }
      });
    });
  }
  return { results, count: results.length };
}

async function addInvoice({ data }) {
  await sleep();
  return {
    id: Math.random(),
    labels: [],
    attachment: 0,
    ...data
  };
}

async function updateInvoice(data) {
  return data;
}

async function removeInvoice(data) {
  await sleep();
  return data;
}

export default {
  getDataInvoice,
  addInvoice,
  updateInvoice,
  removeInvoice
};
