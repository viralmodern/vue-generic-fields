import { get, post, remove, patch } from "./base";

async function getDataActivities({ matterId, timelineId }) {
  const resp = await get(`/api/matters/${matterId}/timelines/${timelineId}/activities/`);
  return resp.map(x => ({
    ...x,
    id: x.pk,
    members: x.members || [],
    tags: x.tags || [],
  }))
}

async function addActivityTimeline(req) {
  const resp = await post(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/`, req.body);
  return {
    ...resp,
    id: resp.pk
  }
}

async function deleteItemActivityTimeline({ matterId, timelineId, id }) {
  return await remove(`/api/matters/${matterId}/timelines/${timelineId}/activities/${id}`);
}

async function updateDataActivities(req) {
  const resp = await patch(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.id}/`, req.body);
  return {
    id: resp.pk,
    ...resp
  }
}

// character 
async function addCharacter(req) {
  return post(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/characters/`, req.body);
}

async function removeCharacter(req) {
  return remove(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/characters/${req.characters_id}/`)
}

// tags 
async function addTagsActivities(req) {
  return post(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/tags/`, req.body);
}

async function removeTagsActivities(req) {
  return remove(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/tags/${req.tagId}/`)
}
// Attachments 
async function getAttachmentsTimeLine(req) {
  return get(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/attachments/`)
}

async function postAttachmentTimeLine(req) {
  return post(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/attachments/`, req.formData)
}

async function removeAttachmentTimeLine(req) {
  return remove(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/attachments/${req.attachmentsId}/`)
}

// Comments 
async function getCommentTimeLine(req) {
  return get(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/comments/`)
}

async function postCommentTimeLine(req) {
  return post(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/comments/`, req.body)
}

// Notes
async function getDataNote({matterId, timelineId, activitiesId}) {
  return await get(`/api/matters/${matterId}/timelines/${timelineId}/activities/${activitiesId}/notes/`)
}

async function createNote(req) {
  return await post(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/notes/`, req.body);
}

async function deleteNote(req) {
  return await remove(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/notes/${req.noteId}/`);
}

async function editNote(req) {
  return await patch(`/api/matters/${req.matterId}/timelines/${req.timelineId}/activities/${req.activitiesId}/notes/${req.noteId}/`, req.body);
}

export default {
  getDataActivities,
  addActivityTimeline,
  deleteItemActivityTimeline,
  updateDataActivities,

  addCharacter,
  removeCharacter,

  addTagsActivities,
  removeTagsActivities,
  
  getAttachmentsTimeLine,
  postAttachmentTimeLine,
  removeAttachmentTimeLine,

  getCommentTimeLine,
  postCommentTimeLine,

  getDataNote,
  createNote,
  deleteNote,
  editNote
};
