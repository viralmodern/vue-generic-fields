import { get, remove, patch, post } from "./base";

async function getDataCAFDiscovery(request) {
  return await get(`/api/matters/${request.matterId}/request-sets/`,
    {
      params: {
        page: request.page,
        task_null: request.task_null
      }
    }
  )
}

async function removeRequestSet(request) {
  return await remove(`/api/matters/${request.matterId}/request-sets/${request.id}/`);
}

async function updateRequest(request) {
  return await patch(`/api/matters/${request.matterId}/request-sets/${request.rowId}/`, request.bodyRequest);
}

async function createRequestSet(request) {
  return await post(`/api/matters/${request.matterId}/request-sets/`, request);
}

export default {
  getDataCAFDiscovery,
  removeRequestSet,
  updateRequest,
  createRequestSet
}
