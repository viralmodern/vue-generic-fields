import { get, post, patch, sleep, remove } from "../../base";
import { getFieldArrayObjectNullAble, formatQuery, getFormData2 } from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    ...x,
    id: x.pk,
    name: x.name,
    date: x.date,
    desc: x.desc,
    attachments: x.attachments,
    who_reads: x.who_reads.map(x => {
      return {
        id: x.pk,
        name: `${x.last_name} ${x.first_name}`,
        avatarUrl: x.avatar
      }
    }),
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

async function getDataDrafts({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/`;
  const options = {
    params: formatQuery(searchObject)
  }
  const result = await get(url, options);
  const results = mapResult(result.results);
  return {
    results,
    count: result.count,
  };
}

async function getDataDraftsDetail(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.rowId}/`;
  const result = await get(url);
  return mapObjectResult(result)
}


async function addDataDrafts({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/`;
  const bodyMap = {
    ...body,
    who_reads: getFieldArrayObjectNullAble(body.who_reads),
  }
  const result = await post(url, getFormData2(bodyMap));
  return mapObjectResult(result);
}

async function updateDataDrafts({ idParams, body }) {
  let bodyMap = {
    ...body,
  }
  if (body.who_reads) {
    bodyMap.who_reads = body.who_reads.map(x => x.id)
  }
  const result = await patch(`/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.rowId}/`,
    getFormData2(bodyMap, [null, undefined])
  );
  return mapObjectResult(result);
}

async function removeDataDrafts({ matterId, depositionId, rowId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/drafts/${rowId}/`,
  );
  return result;
}
// bookmark
async function addBookmarkDrafts({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.rowId}/bookmarks/`;
  const result = await post(url);
  return result;
}

async function removeBookmarkDrafts({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.rowId}/bookmarks/`;
  const result = await remove(url);
  return result;
}

// notes
async function getDataNoteDrafts({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.draftId}/notes/`;
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

async function addNotesDrafts({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.draftId}/notes/`;
  const result = await post(url, bodyMap);
  return result;
}

async function updateNotesDrafts({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.draftId}/notes/${idParams.noteId}/`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeNotesDrafts({
  matterId,
  depositionId,
  draftId,
  noteId
}) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/drafts/${draftId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}
// comments
async function getDataCommentDrafts({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.draftId}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentDrafts({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.draftId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentDrafts({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.draftId}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentDrafts({ matterId, depositionId, draftId, commentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/drafts/${draftId}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}
// attachment
async function addAttachmentDraft({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.draftId}/attachments/`;
  const result = await post(url, getFormData2(body));
  return result;
}

async function updateAttachmentDraft({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/drafts/${idParams.draftId}/attachments/${idParams.attachmentId}/`;
  const result = await patch(url, getFormData2(body));
  return result;
}

async function removeAttachmentDraft({
  matterId,
  depositionId,
  draftId,
  attachmentId
}) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/drafts/${draftId}/attachments/${attachmentId}/`;
  const result = await remove(url);
  return result;
}
export default {
  getDataDrafts,
  addDataDrafts,
  updateDataDrafts,
  removeDataDrafts,
  addBookmarkDrafts,
  removeBookmarkDrafts,
  //note
  getDataNoteDrafts,
  addNotesDrafts,
  updateNotesDrafts,
  removeNotesDrafts,
  //comment
  getDataCommentDrafts,
  addCommentDrafts,
  updateCommentDrafts,
  removeCommentDrafts,
  //attachment
  addAttachmentDraft,
  updateAttachmentDraft,
  removeAttachmentDraft,
  //Detail
  getDataDraftsDetail
};
