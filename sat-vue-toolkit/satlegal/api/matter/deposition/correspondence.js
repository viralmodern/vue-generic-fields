import { get, post, remove, patch } from "../../base";
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
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/`;
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
      results: mapResult(result.results) || [],
      totals: result.count || 0,
      next: result.next
    }
  };
}

async function getDataFromApiDetail(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/${idParams.rowId}/`;
  const result = await get(url);
  return result
}

async function addRequestApi({ idParams, body }) {
  const formData = getFormData2(body);
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/`,
    formData
  );
  return {
    id: result.pk,
    ...result
  };
}

async function updatedRequestApi({ idParams, body }) {
  const formData = getFormData2(body, [null, undefined]);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/${idParams.rowId}/`,
    formData
  );
  return result;
}

async function removeRequestApi({ matterId, depositionId, rowId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/correspondences/${rowId}/`
  );
  return result;
}

async function getDataNotes({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/${idParams.noteId}/notes/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  const data = result.results.map(x => ({
    id: x.pk,
    title: x.title,
    content: x.text,
    creator: x.creator,
    createdAt: x.created,
  }))
  return {
    results: data,
    count: result.count,
  };
}

async function addNotes({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/${idParams.rowId}/notes/`;
  const result = await post(url, body);
  return result;
}

async function updateNotes({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/${idParams.rowId}/notes/${idParams.noteId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeNotes({ matterId, depositionId, rowId, noteId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/correspondences/${rowId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}

// comments
async function getDataCommentKeyPleading({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/${idParams.id}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentKeyPleading({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/${idParams.id}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentKeyPleading({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/${idParams.id}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentKeyPleading({ matterId, depositionId, id, commentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/correspondences/${id}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}

// attachment
async function addAttachment({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/${idParams.requestForProductionId}/attachments/`;
  const result = await post(url, getFormData2(body));
  return result;
}

async function updateAttachment({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/correspondences/${idParams.requestForProductionId}/attachments/${idParams.attachmentId}/`;
  const result = await patch(url, getFormData2(body));
  return result;
}

async function removeAttachment({ matterId, depositionId, requestForProductionId, attachmentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/correspondences/${requestForProductionId}/attachments/${attachmentId}/`;
  const result = await remove(url);
  return result;
}

export default {
  getDataFromApi,
  addRequestApi,
  updatedRequestApi,
  removeRequestApi,
  addNotes,
  updateNotes,
  removeNotes,
  getDataCommentKeyPleading,
  addCommentKeyPleading,
  updateCommentKeyPleading,
  removeCommentKeyPleading,
  getDataNotes,
  //attachment
  addAttachment,
  updateAttachment,
  removeAttachment,
  getDataFromApiDetail
};
