import { sleep } from "./base";
import { dataFactChronology } from "../mock-data/matter.discovery.deposition.preparation.factChronology";

async function getDataFactChronology({ searchObject = {} }) {
  let results = dataFactChronology;
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
  // const abc = await get(
  //   `/api/matters/19/depositions/6/facts/`,
  //   {
  //     params: {
  //       page: 1
  //     }
  //   }
  // );
  // console.log("abc", abc)
  return { results, count: results.length };
}

async function addFactChronology({ data }) {
  await sleep();
  return {
    id: Math.random(),
    ...data
  };
}

async function updateFactChronology(data) {
  return data;
}

async function removeFactChronology(data) {
  await sleep();
  return data;
}

export default {
  getDataFactChronology,
  addFactChronology,
  updateFactChronology,
  removeFactChronology
};
