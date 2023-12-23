import { sleep } from "./base";
import { dataExpertMethod } from "../mock-data/matter.discovery.deposition.preparation.expertMethod";

async function getDataExpertMethod({ searchObject = {} }) {
  let results = dataExpertMethod;
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

async function addExpertMethod({ data }) {
  await sleep();
  return {
    id: Math.random(),
    peer_review_proof: 0,
    ...data
  };
}

async function updateExpertMethod(data) {
  return data;
}

async function removeExpertMethod(data) {
  await sleep();
  return data;
}

export default {
  getDataExpertMethod,
  addExpertMethod,
  updateExpertMethod,
  removeExpertMethod
};
