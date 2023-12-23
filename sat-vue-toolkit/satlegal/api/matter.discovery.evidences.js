import { get, post, patch } from "./base";
async function getDataDiscoveryEvidences(matterId) {
  const dataApi = await get(`/api/matters/${matterId}/evidences/`, {
    params: {
      page: 1
    }
  });
  const result = (dataApi.results || []).map(x => ({
    id: x.pk,
    name: x.name,
    providedBy: x.provided_by,
    creator: x.creator,
    authoredBy: x.authored_by,
    favorable: x.favorable,
    exception: true,
    tags: x.tags,
    linkedRecord: [],
    underOath: true,
    disputed: x.disputed,
    relevance: x.relevance,
    relevanceLevel: x.relevance_level,
    materiality: x.materiality,
    materialLevel: x.materiality_level,
    admissbility: x.admissibility,
    admissibilityLevel: x.admissibility_level,
    objectivity: 51,
    objectivityLevel: 5,
    attachment: x.total_attachments,
    type: 2
  }));
  return result;
}

async function createItemEvidences(data) {
  const dataAdd = {
    name: data.name,
    desc: data.description,
    provided_by: data.providedBy,
    tags: data.tags
  };
  const dataApi = await post(`/api/matters/${data.matterId}/evidences/`, dataAdd);
  const result = {
    id: dataApi.pk,
    name: dataApi.name,
    desc: dataApi.desc,
    creator: 3,
    provided_by: dataApi.provided_by,
    tags: dataApi.tags.map(x => x.pk)
  }
  return result;
}
async function editDataDiscovery(data) {
  const dataMap = {
    [data.columnName]: data.newValue
  }
  const results = {
    name: dataMap.name,
    providedBy: dataMap.provided_by,
    creator: dataMap.creator,
    authoredBy: dataMap.authored_by,
    favorable: dataMap.favorable,
    exception: true,
    tags: dataMap.tags,
    linkedRecord: [],
    underOath: true,
    disputed: dataMap.disputed,
    relevance: dataMap.relevance,
    relevanceLevel: dataMap.relevance_level,
    materiality: dataMap.materiality,
    materialLevel: dataMap.materiality_level,
    admissbility: dataMap.admissibility,
    admissibilityLevel: dataMap.admissibility_level,
    objectivity: 51,
    objectivityLevel: 5,
    attachment: dataMap.total_attachments
  };
  const dataApi = await patch(`/api/matters/${data.matterId}/evidences/${data.taskId}/`, results);
  return dataApi;
}

export default {
  getDataDiscoveryEvidences,
  createItemEvidences,
  editDataDiscovery
}