import { sleep } from "./base";
import { dataDraft } from "../mock-data/matter.discovery.deposition.preparation.draft";

async function getDataDraft({ searchObject = {} }) {
  let results = dataDraft;
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

async function addDraft({ data }) {
  await sleep();
  return {
    id: Math.random(),
    labels: [],
    attachment: 0,
    ...data
  };
}

async function updateDraft(data) {
  return data;
}

async function removeDraft(data) {
  await sleep();
  return data;
}

export default {
  getDataDraft,
  addDraft,
  updateDraft,
  removeDraft
};
