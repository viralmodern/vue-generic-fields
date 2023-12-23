import { post, get, patch, remove } from "./base";
// import { requestItem } from "../mock-data/matter.discovery.status.request-item";
import { valueNoGroup } from "../config";

function formatQuery(query) {
  const data = JSON.parse(JSON.stringify(query));
  for (const key in data) {
    if (Array.isArray(data[key])) {
      data[key] = data[key].join();
    }
  }
  return data;
}

async function getDataRequestItem({ stage = {}, searchObject = {} }) {
  delete searchObject.all;
  const boardList = {};
  Array.isArray(searchObject.group_items) &&
    searchObject.group_items.forEach(key => {
      boardList[key] = {
        id: +key,
        list: [],
        next: null,
        totals: null
      };
    });
  const url = `/api/matters/19/request-sets/all-request-items`;
  const options = {
    params: formatQuery(searchObject)
  };
  let result = await get(url, options);
  if (!stage.name || stage.name === "All") {
    const list = result.results.map(x => ({
      id: x.pk,
      ...x,
      request_task: x.task && x.task.name,
      request_type: 2,
      deadline: "2019-10-09T04:44:17.695Z",
      objection: "hello objection",
      members: [6],
      total_attachments: 3,
      total_notes: 2
    }));
    result = {
      [valueNoGroup]: {
        id: valueNoGroup,
        list,
        totals: result.count
      }
    };
  } else {
    for (let key in result) {
      const list = result[key].results.map(x => ({
        id: x.pk,
        ...x,
        request_task: x.task && x.task.name,
        request_type: 2,
        deadline: "2019-10-09T04:44:17.695Z",
        objection: "hello objection",
        members: [6],
        total_attachments: 3,
        total_notes: 2
      }));
      result[key] = {
        id: +key,
        list,
        next: result[key].next,
        totals: result[key].count
      };
    }
  }
  return { ...boardList, ...result };
}

async function addRequestItem({ idParams, data }) {
  delete data.request_set;
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/items/`;
  const result = await post(url, data);
  return {
    id: result.pk,
    ...result,
    request_task: result.task && result.task.name,
    request_type: 2,
    deadline: "2019-10-09T04:44:17.695Z",
    objection: "hello objection",
    members: [6],
    total_attachments: 3,
    total_notes: 2
  };
}

async function updateRequestItem({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/items/${idParams.requestItemId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeRequestItem({ matterId, requestSetId, requestItemId }) {
  const result = await remove(
    `/api/matters/${matterId}/request-sets/${requestSetId}/items/${requestItemId}/`
  );
  return result;
}

export default {
  getDataRequestItem,
  addRequestItem,
  updateRequestItem,
  removeRequestItem
};
