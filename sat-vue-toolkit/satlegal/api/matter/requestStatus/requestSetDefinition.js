import { post, get, patch, remove } from "../../base";
import {
  formatQuery,
} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return {
      ...x,
      id: x.pk,
      term: x.term,
      desc: x.desc,
    }
  })
}

async function getRequestApi({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/definitions/`;
  const options = {
    params: formatQuery(searchObject)
  };
  const result = await get(url, options);
  const results = mapResult(result.results)
  return {
    results,
    count: result.count
  }
}

async function addRequestApi({ idParams, body }) {
  const result = await post(
    `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/definitions/`,
    body
  );
  return result
}

async function patchRequestApi(payload) {
  const result = await patch(
    `/api/matters/${payload.matterId}/request-sets/${payload.requestSetId}/definitions/${payload.definitionId}/`,
    payload.body
  );
  return result
}

async function removeRequestApi(payload) {
  const result = await remove(
    `/api/matters/${payload.matterId}/request-sets/${payload.requestSetId}/definitions/${payload.rowId}/`
  );
  return result;
}
// bookmark
async function addBookmarkDefinition({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/definitions/${idParams.rowId}/bookmarks/`;
  const result = await post(url);
  return result;
}

async function removeBookmarkDefinition({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/definitions/${idParams.rowId}/bookmarks/`;
  const result = await remove(url);
  return result;
}

export default {
  getRequestApi,
  addRequestApi,
  patchRequestApi,
  removeRequestApi,
  addBookmarkDefinition,
  removeBookmarkDefinition
};
