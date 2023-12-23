import { sleep } from "./base";
import { dataCorrespondence } from "../mock-data/matter.discovery.deposition.preparation.correspondence";

async function getDataCorrespondence({ searchObject = {} }) {
  let results = dataCorrespondence;
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

async function addCorrespondence({ data }) {
  await sleep();
  return {
    id: Math.random(),
    labels: [],
    attachment: 0,
    ...data
  };
}

async function updateCorrespondence(data) {
  return data;
}

async function removeCorrespondence(data) {
  await sleep();
  return data;
}

export default {
  getDataCorrespondence,
  addCorrespondence,
  updateCorrespondence,
  removeCorrespondence
};
