import { sleep } from "./base";
import { questionStatus } from "../mock-data/matter.discovery.deposition.questionStatus";

async function getDataQuestionStatus({ stage = {}, searchObject = {} }) {
  let dataMap = {};
  delete searchObject.all;
  if (!stage.name || stage.name === "all") {
    dataMap = {
      ['all']: {
        id: 1,
        results: questionStatus,
        totals: questionStatus.length
      }
    };
  } else {
    delete searchObject.page;
    searchObject[stage.field].forEach(id => {
      const results = questionStatus.filter(x => {
        if (Array.isArray(x[stage.field])) {
          return x[stage.field].includes(id);
        } else {
          return x[stage.field] === id;
        }
      });
      dataMap[id] = {
        id,
        results,
        totals: results.length
      };
    });
  }
  return dataMap;
}

async function addQuestionStatus({ data }) {
  await sleep();
  return {
    id: Math.random(),
    key_testimony: true,
    follow_up: true,
    alert: false,
    subject_matter: [],
    related_exhibit: [],
    related_prior_statement: [],
    related_affidavit: [],
    related_pleadings: [],
    related_request: [],
    related_facts: [],
    related_characters: [],
    subject: [],
    deponent_emotion: "",
    ...data
  };
}

async function updateQuestionStatus(data) {
  return data;
}

async function removeQuestionStatus(data) {
  await sleep();
  return data;
}

export default {
  getDataQuestionStatus,
  addQuestionStatus,
  updateQuestionStatus,
  removeQuestionStatus
};
