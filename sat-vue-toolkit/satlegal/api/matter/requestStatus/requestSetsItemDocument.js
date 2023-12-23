import { get, patch, remove, post } from "../../base";
import {
  formatQuery, getFormData2
} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
}

function mapObjectResult(x) {
  return {
    ...x,
    id: x.pk,
    custodians: x.custodians.map(x => {
      return {
        id: x.pk,
        name: `${x.last_name} ${x.first_name}`,
        avatarUrl: x.avatar
      };
    }),
    recipients: x.recipients.map(x => {
      return {
        id: x.pk,
        name: `${x.last_name} ${x.first_name}`,
        avatarUrl: x.avatar
      };
    }),
    authors: x.authors.map(x => {
      return {
        id: x.pk,
        name: `${x.last_name} ${x.first_name}`,
        avatarUrl: x.avatar
      };
    }),
    // request_item: x.request_item && x.request_item.pk
  };
}

async function getDataRSID({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.rSId}/items/${idParams.itemsId}/documents/`;
  const options = {
    params: formatQuery(searchObject)
  };
  const group = {};
  Array.isArray(searchObject.group_items) && searchObject.group_items.forEach(key => {
    group[key] = {
      pk: +key,
      results: [],
      totals: 0,
      next: null,
    }
  });
  const result = await get(url, options);
  if (!searchObject.ungroup) {
    for (let key in result) {
      const results = mapResult(result[key].results);
      result[key] = {
        pk: +key,
        results,
        totals: result[key].count || 0,
        next: result[key].next,
      }
    }
    return { ...group, ...result };
  }
  return {
    all: {
      pk: 'all',
      results: mapResult(result.results),
      totals: result.count,
      next: result.next,
    }
  }
}
async function getRequestItem({ matterId, rSId }) {
  const result = await get(`/api/matters/${matterId}/request-sets/${rSId}/items/?ungroup=true`)
  return result.results.map(item => ({
    value: item.pk,
    name: item.name
  }));
}
async function updateRSID({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  if (bodyMap.custodians) {
    bodyMap.custodians = bodyMap.custodians.map(x => x.id);
  }
  if (bodyMap.authors) {
    bodyMap.authors = bodyMap.authors.map(x => x.id);
  }
  if (bodyMap.recipients) {
    bodyMap.recipients = bodyMap.recipients.map(x => x.id);
  }
  if (bodyMap.request_item) {
    bodyMap.request_item = bodyMap.request_item.pk;
  }
  const result = await patch(
    `/api/matters/${idParams.matterId}/request-sets/${idParams.rSId}/items/${idParams.itemsId}/documents/${idParams.id}/`,
    getFormData2(bodyMap)
  );
  return mapObjectResult(result);
}
async function removeRSID(payload) {
  return await remove(
    `/api/matters/${payload.matterId}/request-sets/${payload.rSId}/items/${payload.itemsId}/documents/${payload.id}/`
  );
}

async function getDataAttachment({ idParams, query }) {
  const url = `api/matters/${idParams.matterId}/request-sets/${idParams.rSId}/items/${idParams.itemsId}/documents/${idParams.rowId}/attachments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;

}

async function addAttachment({ idParams, body }) {
  const url = `api/matters/${idParams.matterId}/request-sets/${idParams.rSId}/items/${idParams.itemsId}/documents/${idParams.rowId}/attachments/`;
  const result = await post(url, body);
  return result;
}

async function removeAttachment({ matterId, rSId, rowId, itemsId, attachmentId }) {
  const url = `/api/matters/${matterId}/request-sets/${rSId}/items/${itemsId}/documents/${rowId}/attachments/${attachmentId}/`;
  const result = await remove(url);
  return result;
}

async function getDataNotes({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.rSid}/items/${idParams.itemsId}/documents/${idParams.noteId}/notes/`;
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
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.rSid}/items/${idParams.itemsId}/documents/${idParams.rowId}/notes/`;
  const result = await post(url, body);
  return result;
}

async function updateNotes({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.rSid}/items/${idParams.itemsId}/documents/${idParams.rowId}/notes/${idParams.noteId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeNotes({ matterId, rSid, rowId, noteId, itemsId }) {
  const url = `/api/matters/${matterId}/request-sets/${rSid}/items/${itemsId}/documents/${rowId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}

async function addRSID({ idParams, body }) {
  const result = await post(
    `/api/matters/${idParams.matterId}/request-sets/${idParams.rSId}/items/${idParams.itemsId}/documents/`,
    getFormData2(body)
  );
  return mapObjectResult(result);
}

// comments
async function getDataCommentRSID({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.rSId}/items/${idParams.itemsId}/documents/${idParams.id}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentRSID({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.rSId}/items/${idParams.itemsId}/documents/${idParams.id}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentRSID({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.rSId}/items/${idParams.itemsId}/documents/${idParams.id}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentRSID({ matterId, rSId, id, commentId, itemsId }) {
  const url = `/api/matters/${matterId}/request-sets/${rSId}/items/${itemsId}/documents/${id}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}

export default {
  getRequestItem,
  getDataRSID,
  updateRSID,
  removeRSID,
  getDataAttachment,
  addAttachment,
  removeAttachment,
  getDataNotes,
  addNotes,
  updateNotes,
  removeNotes,
  addRSID,
  // comment
  getDataCommentRSID,
  addCommentRSID,
  removeCommentRSID,
  updateCommentRSID,
};
