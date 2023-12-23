import { sleep } from "./base";
import { dataPublication } from "../mock-data/matter.discovery.deposition.preparation.publication";

async function getDataPublication({ searchObject = {} }) {
  let results = dataPublication;
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

async function addPublication({ data }) {
  await sleep();
  return {
    id: Math.random(),
    labels: [],
    attachment: 0,
    ...data
  };
}

async function updatePublication(data) {
  return data;
}

async function removePublication(data) {
  await sleep();
  return data;
}

export default {
  getDataPublication,
  addPublication,
  updatePublication,
  removePublication
};
