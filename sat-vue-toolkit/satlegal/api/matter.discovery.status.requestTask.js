import { get, remove, post, patch } from "./base";
import { valueNoGroup } from "../config";

async function getDataRequestTask(request) {
  var dataTaskFromApi = await get(`/api/matters/${request.matterId}/request-sets/all-request-tasks`, { params: request.params });
  if (request.params.ungroup === true) {
    var dataMap = {
      [valueNoGroup]: {
        results: dataTaskFromApi.results || [],
        totals: dataTaskFromApi.count || 0,
        next: dataTaskFromApi.next || null
      }
    };
    return dataMap;
  } else {
    var stringToArray = request.params.group_items.split(",").map(String, Number);
    return stringToArray.reduce((a, b) => Object.assign(a, {
      [b]: {
        results: dataTaskFromApi[b] ? dataTaskFromApi[b].results : [],
        totals: dataTaskFromApi[b] ? dataTaskFromApi[b].count : 0,
        next: dataTaskFromApi[b] ? dataTaskFromApi[b].next : null
      }
    }), {});
  }
}

async function addRequestTask(request) {
  return await post(`/api/matters/${request.data.matterId}/request-sets/${request.data.request_set}/tasks/`, request.data)
}

async function updateRequestTask(request) {
  return await patch(`/api/matters/${request.idParams.matterId}/request-sets/${request.idParams.request_set}/tasks/${request.idParams.requestTaskId}/`, request.body);
}

async function removeRequestTask(req) {
  return await remove(`/api/matters/${req.matterId}/request-sets/${req.request_sets}/tasks/${req.requestTaskId}/`)
}

export default {
  getDataRequestTask,
  addRequestTask,
  updateRequestTask,
  removeRequestTask,
};
