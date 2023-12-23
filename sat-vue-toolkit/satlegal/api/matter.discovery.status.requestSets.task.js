import { sleep } from "./base";
import { requestTask } from "../mock-data/matter.discovery.status.requestTask";
import { valueNoGroup } from "../config";

async function getDataRequestTask({ stage = {}, searchObject = {} }) {
  let dataMap = {};
  delete searchObject.all;
  if (!stage.name || stage.name === "All") {
    dataMap = {
      [valueNoGroup]: {
        id: valueNoGroup,
        list: requestTask,
        totals: requestTask.length
      }
    };
  } else {
    delete searchObject.page;
    searchObject[stage.field].forEach(id => {
      const results = requestTask.filter(x => {
        if (Array.isArray(x[stage.field])) {
          return x[stage.field].includes(id);
        } else {
          return x[stage.field] === id;
        }
      });
      dataMap[id] = {
        id,
        list: results,
        totals: results.length
      };
    });
  }
  return dataMap;
}

async function addRequestTask({ data }) {
  await sleep();
  return {
    id: Math.random(),
    notes: [],
    comments: [],
    attachments: [],
    ...data
  };
}

async function updateRequestTask(data) {
  return data;
}

async function removeRequestTask(data) {
  await sleep();
  return data;
}

export default {
  getDataRequestTask,
  addRequestTask,
  updateRequestTask,
  removeRequestTask
};
