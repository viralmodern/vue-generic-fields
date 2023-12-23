import { get, post, patch } from "./base";
async function getDataDiscoveryHearsay(matterId) {
  const dataApi = await get(`/api/matters/${matterId}/hearsays/`, {
    params: {
      page: 1
    }
  });
  const result = (dataApi.results || []).map(x => ({
    id: x.pk,
    name: x.name,
    creator: x.creator,
    providedBy: x.provided_by,
    authoredBy: x.authored_by,
    originialDate: "2019-05-21",
    favorable: x.favorable,
    exception: x.exception,
    declarantAvailable: x.declarant,
    exceptionType: x.exception_type,
    tags: x.tags,
    linkedRecord: [],
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
  const dataApi = await post(`/api/matters/${data.matterId}/hearsays/`, dataAdd);
  const result = {
    id: dataApi.pk,
    name: dataApi.name,
    creator: dataApi.creator,
    providedBy: dataApi.provided_by,
    authoredBy: dataApi.authored_by,
    favorable: dataApi.favorable,
    exception: dataApi.exception,
    declarantAvailable: dataApi.declarant,
    exceptionType: dataApi.exception_type,
    tags: dataApi.tags.map(x => x.pk),
    linkedRecord: [],
  }
  return result;
}
async function editDataDiscovery(data) {
  const dataMap = {
    [data.columnName]: data.newValue
  }
  const results = {
    name: dataMap.name,
    creator: dataMap.creator,
    provided_by: dataMap.providedBy,
    authored_by: dataMap.authoredBy ? [dataMap.authoredBy] : undefined,
    favorable: dataMap.favorable,
    exception: dataMap.exception,
    declarant: dataMap.declarantAvailable,
    exception_type: dataMap.exceptionType,
    tags: dataMap.tags,
  };
  const dataApi = await patch(`/api/matters/${data.matterId}/hearsays/${data.taskId}/`, results);
  return dataApi;
}

export default {
  getDataDiscoveryHearsay,
  createItemEvidences,
  editDataDiscovery
}