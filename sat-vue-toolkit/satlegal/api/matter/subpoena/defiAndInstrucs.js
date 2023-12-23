import { get, patch, remove, post } from "../../base";
import {
  formatQuery, getFieldNullAble
} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return {
      ...x,
      id: x.pk,
    };
  });
}
async function getDataFromApi({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/defi-and-instrucs/`;
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
async function patchRequestApi({ idParams, body }) {
  const result = await patch(
    `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/defi-and-instrucs/${idParams.rowId}/`,
    body
  );
  return {
    ...result,
    id: result.pk,
  };
}
async function removeRequestApi(payload) {
  return await remove(
    `/api/matters/${payload.matterId}/subpoenas/${payload.subpoenaId}/defi-and-instrucs/${payload.rowId}/`
  );
}
async function addDefiAndInstrucs({ idParams, body }) {
  const bodyMap = {
    ...body,
    priority: getFieldNullAble(body.priority)
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/defi-and-instrucs/`,
    bodyMap
  );
  return {
    ...result,
    id: result.pk,
    privilege_invoke: true,
  };
}
export default {
  getDataFromApi,
  patchRequestApi,
  removeRequestApi,
  addDefiAndInstrucs,
};
