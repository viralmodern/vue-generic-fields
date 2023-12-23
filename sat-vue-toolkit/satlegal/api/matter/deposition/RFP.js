import { get, post, patch, remove } from "../../base";
import {
  getFormData2,
  formatQuery,
  getFieldArrayNullAble,
  getFieldNullAble,
  getFieldArrayObjectNullAble
} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
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

function mapObjectResult(x) {
  return {
    ...x,
    id: x.pk,
    name: x.name,
    produced: x.produced,
    step_to_locate: x.step_to_locate,
    availability: x.availability,
    sources: x.sources,
    legal_issues: x.legal_issues,
    objection: x.objection,
    objection_types: x.objection_types,
    note_count: x.note_count,
    comment_count: x.comment_count,
    attachment_count: x.attachment_count,
    bookmarked_pk: x.bookmarked_pk
  };
}

async function getDataRFP({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/`;
  const options = {
    params: formatQuery(searchObject)
  };
  const group = {};
  Array.isArray(searchObject.group_items) &&
    searchObject.group_items.forEach(key => {
      group[key] = {
        pk: +key,
        results: [],
        totals: 0,
        next: null
      };
    });
  const result = await get(url, options);
  if (!searchObject.ungroup) {
    for (let key in result) {
      const results = mapResult(result[key].results);
      result[key] = {
        pk: +key,
        results,
        totals: result[key].count || 0,
        next: result[key].next
      };
    }
    return { ...group, ...result };
  }
  return {
    all: {
      pk: "all",
      results: mapResult(result.results),
      totals: result.count,
      next: result.next
    }
  };
}

async function getDataRFPDetail(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.requestForProductionId}/`;
  const result = await get(url);
  return  mapObjectResult(result)
}

async function addRFP({ idParams, body }) {
  const bodyMap = {
    ...body,
    legal_issues: getFieldArrayNullAble(body.legal_issues),
    sources: getFieldArrayNullAble(body.sources),
    produced: getFieldNullAble(body.produced),
    availability: getFieldNullAble(body.availability),
    docs_characters: getFieldArrayObjectNullAble(body.docs_characters),
    objection: getFieldNullAble(body.objection),
    objection_types: getFieldArrayNullAble(body.objection_types)
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/`,
    bodyMap
  );
  return {
    ...result,
    sources: result.sources.map(x => x.pk),
    legal_issues: result.legal_issues.map(x => x.pk)
  };
}

async function updateRFP({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.RFPId}/`,
    bodyMap
  );
  return result;
}

async function removeRFP({ matterId, depositionId, RFPId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/requestforproddocs/${RFPId}/`
  );
  return result;
}

// bookmark
async function addBookmarkRFP({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.rowId}/bookmarks/`;
  const result = await post(url);
  return result;
}

async function removeBookmarkRFP({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.rowId}/bookmarks/`;
  const result = await remove(url);
  return result;
}

// attachment
async function addAttachmentRFP({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.requestForProductionId}/attachments/`;
  const result = await post(url, getFormData2(body));
  return result;
}

async function updateAttachmentRFP({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.requestForProductionId}/attachments/${idParams.attachmentId}/`;
  const result = await patch(url, getFormData2(body));
  return result;
}

async function removeAttachmentRFP({
  matterId,
  depositionId,
  requestForProductionId,
  attachmentId
}) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/requestforproddocs/${requestForProductionId}/attachments/${attachmentId}/`;
  const result = await remove(url);
  return result;
}

// notes
async function getNotesRFP({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.RFPId}/notes/`;
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

async function addNotesRFP({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.RFPId}/notes/`;
  const result = await post(url, bodyMap);
  return result;
}

async function updateNotesRFP({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.RFPId}/notes/${idParams.noteId}/`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeNotesRFP({
  matterId,
  depositionId,
  RFPId,
  noteId
}) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/requestforproddocs/${RFPId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}

// comments
async function getComments({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.rowId}/${idParams.parentId}/comments/`;
  const options = {
    params: query
  };
  const result = await get(url, options);
  return {
    results: result.results,
    count: result.count
  };
}

async function addComments({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.rowId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return result;
}

async function removeComments({ matterId, depositionId, commentId, rowId }) {
  return await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/requestforproddocs/${rowId}/comments/${commentId}/`
  );
}

async function patchComments({ idParams, body }) {
  return await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.rowId}/comments/${idParams.commentId}/`,
    body
  );
}

export default {
  getDataRFP,
  addRFP,
  updateRFP,
  removeRFP,
  addBookmarkRFP,
  removeBookmarkRFP,
  //attachment
  addAttachmentRFP,
  updateAttachmentRFP,
  removeAttachmentRFP,
  // note
  getNotesRFP,
  addNotesRFP,
  updateNotesRFP,
  removeNotesRFP,
  // comments
  getComments,
  addComments,
  removeComments,
  patchComments,
  getDataRFPDetail
};
