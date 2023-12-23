import { sleep, get } from "./base";
import { requestItem } from "../mock-data/matter.discovery.status.request-item";
import { valueNoGroup } from "../config";
async function getDataRequestItem({ stage, searchObject = {} }) {
  let dataMap = {};
  delete searchObject.all;
  if (stage.name === "All") {
    // Đang hard code
    // Kiểm tra điều kiện filter, ví api này đang dùng chung cho nhiều function trên nhiều screen khác nhau !
    var response = await get(`/api/matters/19/request-sets/6/items/?ungroup=true&task_null=true`)
    dataMap = {
      [valueNoGroup]: {
        id: valueNoGroup,
        list: response.results,
        totals: response.count,
        next: response.next
      }
    };
  } else {
    delete searchObject.page;
    searchObject[stage.field].forEach(id => {
      const results = requestItem.filter(x => {
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

async function addRequestItem({ data }) {
  await sleep();
  return {
    id: Math.random(),
    ...data
  };
}

async function updateRequestItem(data) {
  return data;
}

async function removeRequestItem(data) {
  await sleep();
  return data;
}

export default {
  getDataRequestItem,
  addRequestItem,
  updateRequestItem,
  removeRequestItem
};
