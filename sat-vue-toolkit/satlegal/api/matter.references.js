import { sleep } from "./base";
import { dataReferences } from "../mock-data/matter.references";

async function getDataReferences({ searchObject = {} }) {
  let results = dataReferences;
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

async function addReferences({ data }) {
  await sleep();
  return {
    id: Math.random(),
    labels: [],
    attachment: 0,
    ...data
  };
}

async function updateReferences(data) {
  return data;
}

async function removeReferences(data) {
  await sleep();
  return data;
}

export default {
  getDataReferences,
  addReferences,
  updateReferences,
  removeReferences
};
