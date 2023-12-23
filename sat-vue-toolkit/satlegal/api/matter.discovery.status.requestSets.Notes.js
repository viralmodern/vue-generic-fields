import { get, remove, post, patch } from "./base";

async function getNotesRequestSets(params) {
  return await get(`/api/matters/${params.matterId}/request-sets/${params.rowId}/notes/?page=${params.page}`);
}

async function addNotesRequest(params) {
  return await post(`/api/matters/${params.matterId}/request-sets/${params.rowId}/notes/`, params.bodyRequest);
}

async function removeNotesRequest(params) {
  return await remove(`/api/matters/${params.matterId}/request-sets/${params.rowId}/notes/${params.id}/`);
}

async function updateNotesRequest(params) {
  return await patch(`/api/matters/${params.matterId}/request-sets/${params.rowId}/notes/${params.notesId}/`, params.bodyRequest);
}

export default {
  getNotesRequestSets,
  addNotesRequest,
  removeNotesRequest,
  updateNotesRequest
}
