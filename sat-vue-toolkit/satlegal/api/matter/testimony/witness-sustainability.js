import { get, post, patch, remove, put } from "../../base";
import {
  formatQuery,
  getFieldNullAble,
  getFieldArrayNullAble,
  getFieldObjectNullAble,
} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data;
}

function mapObjectResult2(x) {
  return x;
}

async function getDataTestimony({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/testimonies/`;
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
  // const result = await get(url, options);
  const result = {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
      {
        "pk": 1,
        "name": "stringcvbcvb\nxxcv\nđâsdasdasdasdas",
        "conclusion": 1,
        "practicability": 2,
        "compellability": 3,
        "competency": 1,
        "geographical": 1,
        "disputes": 3,
        "immunity": 2,
        "totals_comment": 3,
        "totals_note": 2,
        "bookmarked_pk": null,
        "flag": true,
      },
      {
        "pk": 2,
        "name": "string 2",
        "conclusion": 1,
        "practicability": 3,
        "compellability": 3,
        "competency": 2,
        "geographical": 1,
        "disputes": 3,
        "immunity": 1,
        "totals_comment": 3,
        "totals_note": 4,
        "bookmarked_pk": 123,
        "flag": false
      }
    ]
  }
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

async function addTestimony({ idParams, body }) {
  const result = await post(
    `/api/matters/${idParams.matterId}/testimonies/`,
    body
  );
  return mapObjectResult2(result);
}

async function updateTestimony({ idParams, body }) {
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
  const result = await patch(
    `/api/matters/${idParams.matterId}/testimonies/${idParams.depositionId}/`,
    bodyMap
  );
  return mapObjectResult2(result);
}

async function removeTestimony({ matterId, depositionId }) {
  const result = await remove(
    `/api/matters/${matterId}/testimonies/${depositionId}/`
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

// bookmark
async function updateBookmark({ idParams, bookmark }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.id}/bookmarks/`;
  let result = {};
  if (bookmark) {
    result = await remove(url);
  } else {
    result = await post(url)
  }
  return result;
}
export default {
  getDataTestimony,
  addTestimony,
  updateTestimony,
  removeTestimony,
  getNotes,
  addNotes,
  updateNotes,
  removeNotes,
  getComments,
  removeComments,
  patchComments,
  addComments,
  updateBookmark,
};
