import { get, post, patch, remove } from "../../base";
import { formatQuery, getFormData2 } from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
}

function mapObjectResult(x) {
  return {
    ...x,
    pk: x.pk,
    id: x.pk,
    name: x.name,
    author: x.author,
    publication_year: x.publication_year,
    bibliography: x.bibliography,
    desc: x.desc,
    attachments: x.attachments,
    note_count: x.total_notes,
    total_comments: x.total_comments,
  };
}

async function getDataPublisheds({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/`;
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
async function getDataPublishedDetail(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.publishedId}/`;
  const result = await get(url);
  return mapObjectResult(result)
}

async function addDataPublisheds({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/`;
  const bodyMap = {
    ...body
  };
  const result = await post(url, getFormData2(bodyMap));
  return mapObjectResult(result);
}

async function updateDataPublisheds({ idParams, body }) {
  let bodyMap = {
    ...body
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.rowId}/`,
    getFormData2(bodyMap, [null, undefined])
  );
  return mapObjectResult(result);
}

async function removeDataPublisheds({ matterId, depositionId, rowId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/literatures/${rowId}/`;
  const result = await remove(url);
  return result;
}
// bookmark
async function addBookmarkPublisheds({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.rowId}/bookmarks/`;
  const result = await post(url);
  return result;
}

async function removeBookmarkPublisheds({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.rowId}/bookmarks/`;
  const result = await remove(url);
  return result;
}
//note
async function getNotesPublished({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.pubId}/notes/`;
  const options = {
    params: query
  };
  const result = await get(url, options);
  const data = result.results.map(x => ({
    id: x.pk,
    title: x.title,
    content: x.text,
    creator: x.creator,
    createdAt: x.crepted
  }));
  return {
    results: data,
    count: result.count
  };
}

async function addNotesPublished({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.pubId}/notes/`;
  const result = await post(url, body);
  return result;
}
async function updateNotesPublished({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.pubId}/notes/${idParams.noteId}/`;
  const result = await patch(url, body);
  return result;
}
async function removeNotesPublished({ matterId, depositionId, pubId, noteId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/literatures/${pubId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}

// comments
async function getComments({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.rowId}/${idParams.parentId}/comments/`;
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
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.rowId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function removeComments({ matterId, depositionId, commentId, rowId }) {
  return await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/literatures/${rowId}/comments/${commentId}/`
  );
}

async function patchComments({ idParams, body }) {
  return await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.rowId}/comments/${idParams.commentId}/`,
    body
  );
}
// attachment
async function addAttachmentPublished({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.publishedId}/attachments/`;
  const result = await post(url, getFormData2(body));
  return result;
}

async function updateAttachmentPublished({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/literatures/${idParams.publishedId}/attachments/${idParams.attachmentId}/`;
  const result = await patch(url, getFormData2(body));
  return result;
}

async function removeAttachmentPublished({
  matterId,
  depositionId,
  publishedId,
  attachmentId
}) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/literatures/${publishedId}/attachments/${attachmentId}/`;
  const result = await remove(url);
  return result;
}

export default {
  getDataPublisheds,
  addDataPublisheds,
  updateDataPublisheds,
  removeDataPublisheds,
  addBookmarkPublisheds,
  removeBookmarkPublisheds,
  getNotesPublished,
  addNotesPublished,
  updateNotesPublished,
  removeNotesPublished,
  getComments,
  addComments,
  removeComments,
  patchComments,
  //attachment
  addAttachmentPublished,
  updateAttachmentPublished,
  removeAttachmentPublished,
  getDataPublishedDetail
};
