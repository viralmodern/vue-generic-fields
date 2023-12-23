import { get, remove, post, patch } from "./base";

async function getNotesRequestTask(params) {
  return await get(`/api/matters/19/request-sets/6/tasks/5/notes/?page=${params.page}`);
}

async function addNotesRequest(params) {
  return await post(`/api/matters/19/request-sets/6/tasks/5/notes/`, params.bodyRequest);
}

async function removeNotesRequest(params) {
  return await remove(`/api/matters/19/request-sets/6/tasks/5/notes/${params.id}/`);
}

async function updateNotesRequest(params) {
  return await patch(`/api/matters/19/request-sets/6/tasks/5/notes/${params.notesId}/`, params.bodyRequest);
}

export default {
  getNotesRequestTask,
  addNotesRequest,
  removeNotesRequest,
  updateNotesRequest
}
