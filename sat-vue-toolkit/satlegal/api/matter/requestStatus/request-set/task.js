import { get, post, patch, remove } from "../../../base";
import {
  getFormData2,
  formatQuery,
  getFieldNullAble,
  getFieldArrayNullAble,
  getFieldObjectNullAble
} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return {
      ...x,
      time: "01:20"
    };
  });
}

function mapObjectResult2(x) {
  const result = {
    ...x
  };
  return result;
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

async function getDataRequestSetTask({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/`;
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
      result[key] = {
        pk: +key,
        results: mapResult(result[key].results),
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

async function addRequestSetTask({ idParams, body }) {
  const bodyMap = {
    ...body,
    members: getFieldArrayNullAble(body.members),
    deponent_type: getFieldNullAble(body.deponent_type),
    deponent: getFieldObjectNullAble(body.deponent),
    method: getFieldNullAble(body.method),
    priority: getFieldNullAble(body.priority)
  };
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/`;
  const result = await post(url, bodyMap);
  return mapObjectResult2(result);
}

async function updateRequestSetTask({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  if (body.legal_counsels) {
    bodyMap.legal_counsels = body.legal_counsels.map(x => x.id);
  }
  if (body.characters) {
    bodyMap.characters = body.characters.map(x => x.id);
  }
  if (body.deponent) {
    bodyMap.deponent = body.deponent.id;
  }
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/${idParams.requestSetTaskId}/`;
  const result = await patch(url, bodyMap);
  return mapObjectResult2(result);
}

async function removeRequestSetTask({
  matterId,
  requestSetId,
  requestSetTaskId
}) {
  const url = `/api/matters/${matterId}/request-sets/${requestSetId}/tasks/${requestSetTaskId}/`;
  const result = await remove(url);
  return result;
}

// notes
async function getDataNotesRequestSetTask({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/${idParams.requestSetTaskId}/notes/`;
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

async function addNotesRequestSetTask({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/${idParams.requestSetTaskId}/notes/`;
  const result = await post(url, bodyMap);
  return result;
}

async function updateNotesRequestSetTask({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/${idParams.requestSetTaskId}/notes/${idParams.noteId}/`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeNotesRequestSetTask({
  matterId,
  requestSetId,
  requestSetTaskId,
  noteId
}) {
  const url = `/api/matters/${matterId}/request-sets/${requestSetId}/tasks/${requestSetTaskId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}

// attachment
async function addAttachmentRequestSetTask({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/${idParams.requestSetTaskId}/attachments/`;
  const result = await post(url, getFormData2(body));
  return result;
}

async function updateAttachmentRequestSetTask({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/${idParams.requestSetTaskId}/attachments/${idParams.attachmentId}/`;
  const result = await patch(url, getFormData2(body));
  return result;
}

async function removeAttachmentRequestSetTask(data) {
  const url = `/api/matters/${data.matterId}/request-sets/${data.requestSetId}/tasks/${data.requestSetTaskId}/attachments/${data.attachmentId}/`;
  const result = await remove(url);
  return result;
}

// comments
async function getDataCommentRequestSetTask({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/${idParams.requestSetTaskId}/${idParams.parentId}/comments/`;
  const options =  {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentRequestSetTask({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/${idParams.requestSetTaskId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentRequestSetTask({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/tasks/${idParams.requestSetTaskId}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentRequestSetTask(data) {
  const url = `/api/matters/${data.matterId}/request-sets/${data.requestSetId}/tasks/${data.requestSetTaskId}/comments/${data.commentId}/`;
  const result = await remove(url);
  return result;
}

export default {
  getDataRequestSetTask,
  addRequestSetTask,
  updateRequestSetTask,
  removeRequestSetTask,
  // notes
  getDataNotesRequestSetTask,
  addNotesRequestSetTask,
  updateNotesRequestSetTask,
  removeNotesRequestSetTask,
  // attachments
  addAttachmentRequestSetTask,
  updateAttachmentRequestSetTask,
  removeAttachmentRequestSetTask,
  // comments
  getDataCommentRequestSetTask,
  addCommentRequestSetTask,
  updateCommentRequestSetTask,
  removeCommentRequestSetTask,
};
