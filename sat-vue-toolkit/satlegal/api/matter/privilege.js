import { get, patch, remove, post } from "../base";
import {
  formatQuery,
  getFormData2,
  getFieldNullAble,
  getFieldArrayNullAble,
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
  };
}

async function getDataPrivilege({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/privilege-logs/`;
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

async function getDataPrivilegeDetail({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/privilege-logs/${idParams.privilegeId}/`;
  const result = await get(url);
  return result;
}


async function updatePrivilege({ idParams, body }) {
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
  const bodyRequest = Object.keys(bodyMap).includes("document_attachment") ? getFormData2(bodyMap) : bodyMap;
  const result = await patch(
    `/api/matters/${idParams.matterId}/privilege-logs/${idParams.id}/`,
    bodyRequest
  );
  return mapObjectResult(result);
}
async function removePrivilege(payload) {
  return await remove(
    `/api/matters/${payload.matterId}/privilege-logs/${payload.id}/`
  );
}

async function addPrivilege({ idParams, body }) {
  const bodyMap = {
    ...body,
    confidentiality: getFieldNullAble(body.confidentiality),
    privilege_justification: getFieldArrayNullAble(body.privilege_justification),
    responsive: getFieldNullAble(body.responsive),
    document_labels: getFieldArrayNullAble(body.document_labels),
    issues: getFieldArrayNullAble(body.issues),
    reviewers: getFieldArrayNullAble(body.reviewers),
    review_status: getFieldNullAble(body.review_status),
    tags: getFieldArrayNullAble(body.tags),
    redaction: getFieldNullAble(body.redaction),
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/privilege-logs/`,
    bodyMap
  );
  return mapObjectResult(result);
}

// comments
async function getDataCommentPrivilege({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/privilege-logs/${idParams.id}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentPrivilege({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/privilege-logs/${idParams.id}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentPrivilege({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/privilege-logs/${idParams.id}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentPrivilege({ matterId, id, commentId }) {
  const url = `/api/matters/${matterId}/privilege-logs/${id}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}

// bookmark
async function addBookmarkPrivilege({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/privilege-logs/${idParams.id}/bookmarks/`;
  const result = await post(url);
  return result;
}

async function removeBookmarkPrivilege({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/privilege-logs/${idParams.id}/bookmarks/`;
  const result = await remove(url);
  return result;
}

// actors

async function updatePrivilegeActor({ idParams, body }) {
  const bodyMap = {
    workspace_member: body.workspace_member_id,
    character: body.characterId,
    actor_type: body.actor_type
  }
  const url = `/api/matters/${idParams.matterId}/privilege-logs/${idParams.privilegeId}/actors/`;
  const result = await post(url, bodyMap);
  return {
    pk: result.pk,
    workspace_member_id: result.workspace_member,
    character: body.character,
    actor_type: result.actor_type
  };
}

async function removePrivilegeActor(data) {
  const url = `/api/matters/${data.matterId}/privilege-logs/${data.privilegeId}/actors/${data.actorId}/`;
  const result = await remove(url);
  return result;
}

async function updateReport({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/privilege-logs/${idParams.rowId}/reports/`;
  let result = {}
  if (body) {
    result = await remove(`${url}${body.pk}/`)
  }
  else {
    result = await post(url, { reason: 's' })
  }
  return result
}

export default {
  getDataPrivilege,
  getDataPrivilegeDetail,
  updatePrivilege,
  removePrivilege,
  addPrivilege,
  // comment
  getDataCommentPrivilege,
  addCommentPrivilege,
  removeCommentPrivilege,
  updateCommentPrivilege,
  // actors
  updatePrivilegeActor,
  removePrivilegeActor,
  // bookmark
  addBookmarkPrivilege,
  removeBookmarkPrivilege,
  updateReport
};
