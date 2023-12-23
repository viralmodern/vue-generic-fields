import { get, post, patch, sleep, remove } from "../../base";
import { formatQuery } from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
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
    entry: x.entry,
    owner: x.owner,
    start_date: x.start_date,
    end_date: x.end_date,
    related_risk_register: [],
    status: x.status,
    bookmarked_pk: x.bookmarked_pk,
    flag: x.flag,
  };
}

async function getDataRiskAction({ idParams, searchObject = {} }) {
  await sleep();
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskActionId}/actions/`;
  const options = {
    params: formatQuery(searchObject)
  }
  const result = await get(url, options);
  const results = mapResult(result.results);
  return {
    results,
    count: result.count,
  };
}

async function addDataRiskAction({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskActionId}/actions/`;
  const bodyMap = {
    ...body,
  }
  const result = await post(url, bodyMap);
  return mapObjectResult(result);
}

async function updateDataRiskAction({ idParams, body }) {
  let bodyMap = {
    ...body,
  }
  const result = await patch(`/api/matters/${idParams.matterId}/risks/${idParams.riskActionId}/actions/${idParams.rowId}/`,
    bodyMap);
  return mapObjectResult(result);
}

async function removeDataRiskAction({ matterId, riskActionId, rowId }) {
  const result = await remove(
    `/api/matters/${matterId}/risks/${riskActionId}/actions/${rowId}/`,
  );
  return result;
}
// bookmark
async function addBookmarkRiskAction({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskActionId}/actions/${idParams.rowId}/bookmarks/`;
  const result = await post(url);
  return result;
}

async function removeBookmarkRiskAction({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskActionId}/actions/${idParams.rowId}/bookmarks/`;
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
    `/api/matters/${idParams.matterId}/risks/${idParams.riskActionId}/actions/${idParams.id}/relations/`,
    bodyMap
  );
  return result;
}

async function removeRelationRisk(data) {
  return await remove(`/api/matters/${data.matterId}/risks/${data.riskActionId}/actions/${data.id}/relations/${data.contentTypeId}/${data.objectId}/`)
}

async function updateReport({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/risks/${idParams.riskActionId}/actions/${idParams.rowId}/reports/`;
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
  getDataRiskAction,
  addDataRiskAction,
  updateDataRiskAction,
  removeDataRiskAction,
  addBookmarkRiskAction,
  removeBookmarkRiskAction,
  updateRelationRisk,
  removeRelationRisk,
  updateReport
};
