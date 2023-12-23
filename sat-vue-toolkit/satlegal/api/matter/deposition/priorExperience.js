import { get, post, remove, patch } from "../../base";
import { formatQuery, getFormData2 } from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
}

function mapObjectResult(x) {
  return {
    ...x,
    note_count: x.note_count || 0
  };
}

function mapDataGetNotes(data) {
  return {
    id: data.pk,
    title: data.title,
    content: data.text,
    creator: data.creator,
    createdAt: data.created
  };
}

function mapDataAddUpdateNotes(data) {
  return {
    title: data.name,
    text: data.content
  };
}

async function getDataPriorExperience({ idParams, searchObject }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/`;
  const options = {
    params: formatQuery(searchObject)
  };
  const result = await get(url, options);
  const results = mapResult(result.results);
  return {
    results,
    count: result.count
  };
}
async function getDataPriorExperienceDetail(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/${idParams.priorId}/`;
  const result = await get(url);
  return result
}

async function addDataPriorExperience({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/`;
  const result = await post(url, getFormData2(body));
  return mapObjectResult(result);
}
async function updateDataPriorExperience({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/${idParams.priorExperienceId}/`;
  const result = await patch(url, getFormData2(body, [null, undefined]));
  return mapObjectResult(result);
}
async function removePriorExperience({
  matterId,
  depositionId,
  priorExperienceId
}) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/prior-experiences/${priorExperienceId}/`
  );
  return result;
}

// notes
async function getDataNotesPriorExperience({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/${idParams.priorExperienceId}/notes/`;
  const options = {
    params: query
  };
  const result = await get(url, options);
  const data = result.results.map(x => mapDataGetNotes(x));
  return {
    results: data,
    count: result.count
  };
}

async function addNotesPriorExperience({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/${idParams.priorExperienceId}/notes/`;
  const result = await post(url, bodyMap);
  return result;
}

async function updateNotesPriorExperience({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/${idParams.priorExperienceId}/notes/${idParams.noteId}/`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeNotesPriorExperience({
  matterId,
  depositionId,
  priorExperienceId,
  noteId
}) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/prior-experiences/${priorExperienceId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}

// comments
async function getDataCommentPriorExperience({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/${idParams.id}/${idParams.parentId}/comments/`;
  const options =  {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentPriorExperience({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/${idParams.id}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentPriorExperience({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/${idParams.id}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentPriorExperience({ matterId, depositionId, id, commentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/prior-experiences/${id}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}

// attachment
async function addAttachment({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/${idParams.requestForProductionId}/attachments/`;
  const result = await post(url, getFormData2(body));
  return result;
}

async function updateAttachment({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/${idParams.requestForProductionId}/attachments/${idParams.attachmentId}/`;
  const result = await patch(url, getFormData2(body));
  return result;
}

async function removeAttachment({ matterId, depositionId, requestForProductionId, attachmentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/prior-experiences/${requestForProductionId}/attachments/${attachmentId}/`;
  const result = await remove(url);
  return result;
}


export default {
  getDataPriorExperience,
  addDataPriorExperience,
  updateDataPriorExperience,
  removePriorExperience,
  getDataNotesPriorExperience,
  addNotesPriorExperience,
  updateNotesPriorExperience,
  removeNotesPriorExperience,
  // comments
  getDataCommentPriorExperience,
  addCommentPriorExperience,
  updateCommentPriorExperience,
  removeCommentPriorExperience,
  //attachment
  addAttachment,
  updateAttachment,
  removeAttachment,
  getDataPriorExperienceDetail
};
