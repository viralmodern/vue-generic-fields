import { get, post, patch, remove, put } from "../../base";
import { formatQuery, getFormData2 } from '../../../utils';

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
}

function mapObjectResult(x) {
  if (!x.relations_info) {
    // không thấy api trả về nên hard
    x.relations_info = {
      total_relations: 0,
      total_first_class_relations: 0,
      first_class_relations: []
    }
  }
  return {
    ...x,
    id: x.pk,
    name: x.name,
    potential_consequence: x.potential_consequence,
    legal_issues: x.legal_issues,
    risk_areas: x.risk_areas,
    likelihood: x.likelihood,
    desc: x.desc,
    severity: x.severity,
    priority: x.priority,
    status: x.status,
    members: x.members,
    point_of_contact: x.point_of_contact,
    who_at_risk: x.who_at_risk,
    level: x.level,
    direction: x.direction,
    frequency: x.frequency,
    detectability: x.detectability,
    criticality: x.criticality,
    owner: x.owner,
    trigger_date: x.trigger_date,
    expiration_date: x.expiration_date,
    attachments: x.attachments,
    tags: x.tags,
    total_notes: x.total_notes,
    risk_sources: x.risk_sources,
    cost: 12,
    bookmarked_pk: x.bookmarked_pk,
    flag: x.flag
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

async function getDataRisk({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/risks/`;
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

async function getAllDataRisk({ matterId }) {
  const result = await get(`/api/matters/${matterId}/partial-info-risks/`);
  return result;
}

async function getAllDataRiskNoGroup({ idParams }) {
  const result = await get(`/api/matters/${idParams.matterId}/risks/?ungroup=true`);
  return result.results || [];
}

async function getDataNotesRisk({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskId}/notes/`;
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

async function addRisk({ idParams, body }) {
  const bodyMap = {
    ...body,
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/risks/`,
    bodyMap
  );
  return {
    ...result,
    id: result.pk,
    legal_issues: result.legal_issues.map(x => x.pk),
    risk_areas: result.risk_areas.map(x => x.pk),
    tags: result.tags.map(x => x.pk),
    risk_sources: result.risk_sources.map(x => x.pk)
  };
}

async function addNotesRisk({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskId}/notes/`;
  const result = await post(url, bodyMap);
  return result;
}

async function updateRisk({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/risks/${idParams.riskId}/`,
    bodyMap
  );
  return result;
}

async function updateNotesRisk({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskId}/notes/${idParams.noteId}/`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeNotesRisk(data) {
  const url = `/api/matters/${data.matterId}/risks/${data.riskId}/notes/${data.noteId}/`;
  const result = await remove(url);
  return result;
}


async function removeRisk({ matterId, riskId }) {
  const result = await remove(
    `/api/matters/${matterId}/risks/${riskId}/`
  );
  return result;
}

async function getRiskDetail(payload) {
  const result = await get(`/api/matters/${payload.matterId}/risks/${payload.riskId}/`)
  return mapObjectResult(result)
}
async function updateRiskDetail(payload) {
  const bodyMap = {
    ...payload.item
  };

  let result = await put(
    `/api/matters/${payload.matterId}/risks/${payload.pk}/`,
    getFormData2(bodyMap)
  );
  return result;
}

async function getHistoriesRisks(payload) {
  return await get(`/api/matters/${payload.matterId}/risks/${payload.riskId}/histories/?page=${payload.page}`);
}
async function postHistoriesRisks(payload) {
  return await post(`/api/matters/${payload.matterId}/risks/${payload.riskId}/histories/`, payload.body);
}
async function patchHistoriesRisks(payload) {
  return await patch(`/api/matters/${payload.matterId}/risks/${payload.riskId}/histories/${payload.historiesId}/`, payload.body);
}
async function deleteHistoriesRisks(payload) {
  return await remove(`/api/matters/${payload.matterId}/risks/${payload.riskId}/histories/${payload.historiesId}/`);
}

// comments
async function getDataCommentHistory({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskId}/histories/${idParams.historyId}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentHistory({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskId}/histories/${idParams.historyId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentHistory({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskId}/histories/${idParams.historyId}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentHistory({ matterId, riskId, historyId, commentId }) {
  const url = `/api/matters/${matterId}/risks/${riskId}/histories/${historyId}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}

// relations
async function updateRelationRisk({ idParams, body }) {
  const bodyMap = {
    relations: [
      {
        content_type_id: body.content_type_id,
        object_id: body.pk.toString(),
        // name: body.name,
      }
    ]
  }
  const result = await post(
    `/api/matters/${idParams.matterId}/risks/${idParams.riskId}/relations/`,
    bodyMap
  );
  return result;
}

async function removeRelationRisk(data) {
  return await remove(`/api/matters/${data.matterId}/risks/${data.riskId}/relations/${data.contentTypeId}/${data.objectId}/`)
}

// attachment
async function addAttachmentRisk({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskId}/attachments/`;
  const result = await post(url, getFormData2(body));
  return result;
}

async function updateAttachmentRisk({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskId}/attachments/${idParams.attachmentId}/`;
  const result = await patch(url, getFormData2(body));
  return result;
}

async function removeAttachmentRisk({
  matterId,
  riskId,
  attachmentId
}) {
  const url = `/api/matters/${matterId}/risks/${riskId}/attachments/${attachmentId}/`;
  const result = await remove(url);
  return result;
}


export default {
  getDataRisk,
  getAllDataRisk,
  getDataNotesRisk,
  addRisk,
  addNotesRisk,
  updateRisk,
  updateNotesRisk,
  removeRisk,
  getRiskDetail,
  updateRiskDetail,
  getHistoriesRisks,
  postHistoriesRisks,
  patchHistoriesRisks,
  deleteHistoriesRisks,
  getAllDataRiskNoGroup,
  getDataCommentHistory,
  addCommentHistory,
  updateCommentHistory,
  removeCommentHistory,

  //relations
  updateRelationRisk,
  removeRelationRisk,
  removeNotesRisk,
  //attachment
  addAttachmentRisk,
  updateAttachmentRisk,
  removeAttachmentRisk,
};
