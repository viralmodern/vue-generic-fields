import { get, post, patch, remove } from "../../base";
import { formatQuery, getFormData2 } from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return {
      id: x.pk,
      ...x
    };
  });
}

async function getDataFromApi({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/`;
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

async function getDataFromApiDetail(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.rowId}/`;
  const result = await get(url);
  return result
}

async function addRequestApi({ idParams, body }) {
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/`,
    getFormData2(body)
  );
  return {
    id: result.pk,
    ...result
  };
}

async function updatedRequestApi({ idParams, body }) {
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.rowId}/`,
    getFormData2(body)
  );
  return result;
}

async function removeRequestApi({ matterId, depositionId, rowId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/given-depositions/${rowId}/`
  );
  return result;
}

// notes
async function getNotes({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.rowId}/notes/`;
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

async function addNotes({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.rowId}/notes/`;
  const result = await post(url, bodyMap);
  return result;
}

async function updateNotes({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.rowId}/notes/${idParams.noteId}/`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeNotes({ matterId, depositionId, rowId, noteId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/given-depositions/${rowId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}

// comments
async function getComments({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.rowId}/${idParams.parentId}/comments/`;
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
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.rowId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return result;
}

async function removeComments({ matterId, depositionId, commentId, rowId }) {
  return await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/given-depositions/${rowId}/comments/${commentId}/`
  );
}

async function patchComments({ idParams, body }) {
  return await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.rowId}/comments/${idParams.commentId}/`,
    body
  );
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

// attachment
async function addAttachment({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.requestForProductionId}/attachments/`;
  const result = await post(url, getFormData2(body));
  return result;
}

async function updateAttachment({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.requestForProductionId}/attachments/${idParams.attachmentId}`;
  const result = await patch(url, getFormData2(body));
  return result;
}

async function removeAttachment({ matterId, depositionId, requestForProductionId, attachmentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/given-depositions/${requestForProductionId}/attachments/${attachmentId}`;
  const result = await remove(url);
  return result;
}

export default {
  getDataFromApi,
  addRequestApi,
  updatedRequestApi,
  removeRequestApi,
  getNotes,
  addNotes,
  updateNotes,
  removeNotes,
  getComments,
  removeComments,
  patchComments,
  addComments,
  //attachment
  addAttachment,
  updateAttachment,
  removeAttachment,
  getDataFromApiDetail
};
