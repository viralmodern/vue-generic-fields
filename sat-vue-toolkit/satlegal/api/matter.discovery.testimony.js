import { get, post, patch } from "./base";
async function getDataDiscoveryTestimony(matterId) {
  const dataApi = await get(`/api/matters/${matterId}/testimonies/`, {
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
    originialDate: "2019-02-12",
    favorable: x.favorable,
    tags: x.tags,
    linkedRecord: [],
    underOath: x.under_oath,
    attachment: x.total_attachments
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
  const dataApi = await post(`/api/matters/${data.matterId}/testimonies/`, dataAdd);
  const result = {
    id: dataApi.pk,
    name: dataApi.name,
    creator: dataApi.creator,
    providedBy: dataApi.provided_by,
    authoredBy: dataApi.authored_by,
    originialDate: "2019-02-12",
    favorable: dataApi.favorable,
    tags: dataApi.tags,
    linkedRecord: [],
    underOath: dataApi.under_oath,
    attachment: dataApi.total_attachments
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
    authored_by: dataMap.authoredBy,
    originialDate: "2019-02-12",
    favorable: dataMap.favorable,
    tags: dataMap.tags,
    linkedRecord: [],
    under_oath: dataMap.underOath,
    total_attachments: dataMap.attachment
  };
  const dataApi = await patch(`/api/matters/${data.matterId}/testimonies/${data.taskId}/`, results);
  return dataApi;
}

export default {
  getDataDiscoveryTestimony,
  createItemEvidences,
  editDataDiscovery
}