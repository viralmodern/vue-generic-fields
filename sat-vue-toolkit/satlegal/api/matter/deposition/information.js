import { get, post, patch, remove } from "../../base";
import {
  getFormData2,
  formatQuery,
  getFieldArrayNullAble,
} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    ...x,
    id: x.pk,
    received_item: x.received_item,
    date_received: x.date_received,
    desc: x.desc,
    attachments: x.attachments,
    note_count: x.note_count || 0,
    comment_count: x.comment_count || 0,
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

async function getDataInfo({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/`;
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

async function getDataInfoDetail(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.rowId}/`;
  const result = await get(url);
  return result
}

async function addDataInfo({ idParams, body }) {
  const bodyMap = {
    ...body,
    labels: getFieldArrayNullAble(body.labels),
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/`,
    bodyMap
  );
  return {
    ...result,
    id: result.pk,
    labels: result.labels.map(x => x.pk),
  };
}
async function updateDataInfo({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.InfoId}/`,
    bodyMap
  );
  return result;
}
async function removeDataInfo({ matterId, depositionId, InfoId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/info-and-docs-experts/${InfoId}/`
  );
  return result;
}
// bookmark
async function addBookmarkInfo({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.rowId}/bookmarks/`;
  const result = await post(url);
  return result;
}

async function removeBookmarkInfo({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.rowId}/bookmarks/`;
  const result = await remove(url);
  return result;
}

// notes
async function getDataNoteInfo({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.InfoId}/notes/`;
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

async function addNotesInfo({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.InfoId}/notes/`;
  const result = await post(url, bodyMap);
  return result;
}

async function updateNotesInfo({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.InfoId}/notes/${idParams.noteId}/`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeNotesInfo({
  matterId,
  depositionId,
  InfoId,
  noteId
}) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/info-and-docs-experts/${InfoId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}
// comments
async function getDataCommentInfo({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.InfoId}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentInfo({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.InfoId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentInfo({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.InfoId}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentInfo({ matterId, depositionId, InfoId, commentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/info-and-docs-experts/${InfoId}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}
// attachment
async function addAttachmentInfo({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.InfoId}/attachments/`;
  const result = await post(url, getFormData2(body));
  return result;
}

async function updateAttachmentInfo({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.InfoId}/attachments/${idParams.attachmentId}/`;
  const result = await patch(url, getFormData2(body));
  return result;
}

async function removeAttachmentInfo({
  matterId,
  depositionId,
  InfoId,
  attachmentId
}) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/info-and-docs-experts/${InfoId}/attachments/${attachmentId}/`;
  const result = await remove(url);
  return result;
}
export default {
  getDataInfo,
  addDataInfo,
  updateDataInfo,
  removeDataInfo,
  addBookmarkInfo,
  removeBookmarkInfo,
  //note
  getDataNoteInfo,
  addNotesInfo,
  updateNotesInfo,
  removeNotesInfo,
  //comment
  getDataCommentInfo,
  addCommentInfo,
  updateCommentInfo,
  removeCommentInfo,
  //attachment
  addAttachmentInfo,
  updateAttachmentInfo,
  removeAttachmentInfo,
  //Detail
  getDataInfoDetail
};
