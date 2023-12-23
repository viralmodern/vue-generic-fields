import { sleep } from "./base";
import { dataIndex } from "../mock-data/matter.discovery.deposition.index";

async function getDataIndex({ searchObject = {} }) {
  let results = dataIndex;
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

async function addIndex({ data }) {
  await sleep();
  return {
    id: Math.random(),
    labels: [],
    attachment: 0,
    ...data
  };
}

async function updateIndex(data) {
  return data;
}

async function removeIndex(data) {
  await sleep();
  return data;
}

export default {
  getDataIndex,
  addIndex,
  updateIndex,
  removeIndex
};
