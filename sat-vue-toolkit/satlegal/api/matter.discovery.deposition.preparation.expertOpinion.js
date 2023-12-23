import { sleep } from "./base";
import { dataExpertOpinion } from "../mock-data/matter.discovery.deposition.preparation.expertOpinion";

async function getDataExpertOpinion({ searchObject = {} }) {
  let results = dataExpertOpinion;
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

async function addExpertOpinion({ data }) {
  await sleep();
  return {
    id: Math.random(),
    assumptions: [],
    attachments: 0,
    ...data
  };
}

async function updateExpertOpinion(data) {
  return data;
}

async function removeExpertOpinion(data) {
  await sleep();
  return data;
}

export default {
  getDataExpertOpinion,
  addExpertOpinion,
  updateExpertOpinion,
  removeExpertOpinion
};
