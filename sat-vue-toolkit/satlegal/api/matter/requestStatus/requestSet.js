import { get, patch, remove, post } from "../../base";
import { formatQuery, getFieldNullAble } from "@/sat-vue-toolkit/satlegal/utils";
import moment from "moment"

function mapRequestStage(stage_new, stage_disputing, stage_received, stage_in_progress) {
  return [
    {
      id: Math.random(),
      name: 'Stage new',
      progress: stage_new,
      color: "#3f51b5"
    },
    {
      id: Math.random(),
      name: 'Stage disputing',
      progress: stage_disputing,
      color: "#f44336"
    },
    {
      id: Math.random(),
      name: 'Stage received',
      progress: stage_received,
      color: "#4caf50"
    },
    {
      id: Math.random(),
      name: 'Stage in progress',
      progress: stage_in_progress,
      color: "#ff0"
    }
  ]
}

function mapResult(data) {
  return data.map(x => {
    return {
      ...x,
      id: x.pk,
      request_stage: mapRequestStage(x.stage_new, x.stage_disputing, x.stage_received, x.stage_in_progress),
      totals_request: x.stage_new + x.stage_disputing + x.stage_received + x.stage_in_progress,
      modified: x.modified && moment(x.modified).format("YYYY-MM-DD HH:mm:ss")
    };
  });
}

async function getDataFromApi({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/`;
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
async function addRequestApi({ idParams, body }) {
  const bodyMap = {
    ...body,
    make_by: body.make_by ? getFieldNullAble(body.make_by.id) : undefined
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/request-sets/`,
    bodyMap
  );
  return {
    id: result.pk,
    ...result
  };
}
async function patchRequestApi(payload) {
  return await patch(
    `/api/matters/${payload.idParams.matterId}/request-sets/${payload.idParams.rowId}/`,
    payload.body
  );
}
async function removeRequestApi(payload) {
  return await remove(
    `/api/matters/${payload.matterId}/request-sets/${payload.rowId}/`
  );
}

export default {
  getDataFromApi,
  addRequestApi,
  patchRequestApi,
  removeRequestApi,
};
