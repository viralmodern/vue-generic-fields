import { post, get, remove, patch } from "../../base";
import {
  formatQuery, getFormData2
} from "../../../utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
}

function mapObjectResult(x) {
  return {
    ...x,
    id: x.pk,
    service_jurisdiction: x.jurisdiction_country + x.jurisdiction_state,
  };
}

async function getDataSubpoena({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/`
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

async function getSupoenaDetail({subpoenaId, matterId}){
  const url = `/api/matters/${matterId}/subpoenas/${subpoenaId}/`;
  const result = await get(url)
  return mapObjectResult(result)
}

async function addSubpoena({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/`;
  const bodyMap = {
    ...body,
  };
  const result = await post(url, bodyMap);
  return mapObjectResult(result);
}

async function updateSubpoena({ idParams, body }) {
  const bodyMap = {
    ...body
  }
  if (body.characters) {
    bodyMap.characters = body.characters.map(x => x.id);
  }
  const result = await patch(
    `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/`, bodyMap.proof_of_service ?
    getFormData2(bodyMap) : bodyMap
  );
  return result;
}

async function removeSubpoena({ matterId, subpoenaId }) {
  const result = await remove(`/api/matters/${matterId}/subpoenas/${subpoenaId}`);
  return result;
}

// notes
async function getDataNotes({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.noteId}/notes/`;
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
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.rowId}/notes/`;
  const result = await post(url, body);
  return result;
}

async function updateNotes({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.rowId}/notes/${idParams.noteId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeNotes({ matterId, rowId, noteId }) {
  const url = `api/matters/${matterId}/subpoenas/${rowId}/notes/${noteId}`;
  const result = await remove(url);
  return result;
}

// comments
async function getDataCommentSubpoenaSet({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.id}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentSubpoenaSet({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.id}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentSubpoenaSet({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.id}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentSubpoenaSet({ matterId, id, commentId }) {
  const url = `/api/matters/${matterId}/subpoenas/${id}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}


export default {
  getDataSubpoena,
  addSubpoena,
  updateSubpoena,
  removeSubpoena,
  // note
  addNotes,
  updateNotes,
  removeNotes,
  getDataNotes,
  // comments
  getDataCommentSubpoenaSet,
  addCommentSubpoenaSet,
  updateCommentSubpoenaSet,
  removeCommentSubpoenaSet,
  getSupoenaDetail,
}
