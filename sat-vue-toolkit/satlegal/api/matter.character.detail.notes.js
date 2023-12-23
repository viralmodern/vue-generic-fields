import { get, post, remove, patch } from "./base";

async function getDataNotes(request) {
  return await get(`/api/matters/${request.matterId}/characters/${request.characterId}/notes/?page=${request.page}`);
}

async function postNotes(request) {
  return await post(`/api/matters/${request.matterId}/characters/${request.characterId}/notes/`, request.body);
}

async function updateNotes(request) {
  return await patch(`/api/matters/${request.matterId}/characters/${request.characterId}/notes/${request.noteId}/`, request.body);
}

async function removeNotes(request) {
  return await remove(`/api/matters/${request.matterId}/characters/${request.characterId}/notes/${request.noteId}/`);
}

export default {
  getDataNotes,
  postNotes,
  updateNotes,
  removeNotes
};
