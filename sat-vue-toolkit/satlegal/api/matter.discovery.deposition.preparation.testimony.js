import { sleep } from "./base";
import { dataTestimony } from "../mock-data/matter.discovery.deposition.preparation.testimony";

async function getDataTestimony({ searchObject = {} }) {
  let results = dataTestimony;
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

async function addTestimony({ data }) {
  await sleep();
  return {
    id: Math.random(),
    labels: [],
    attachment: 0,
    ...data
  };
}

async function updateTestimony(data) {
  return data;
}

async function removeTestimony(data) {
  await sleep();
  return data;
}

export default {
  getDataTestimony,
  addTestimony,
  updateTestimony,
  removeTestimony
};
