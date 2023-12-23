import { get, post, patch, remove } from "../../base";
import { formatQuery, getFieldNullAble } from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return {
      ...x,
      id: x.pk,
    };
  });
}

async function getDataFromApi({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/`;
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

async function getDataDetailFromApi(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/${idParams.affId}/`;
  const result = await get(url)
  return { ...result, id: result.pk }
}

async function addKeyPleading({ idParams, body }) {
  const bodyMap = {
    ...body,
    make_by: body.make_by ? getFieldNullAble(body.make_by.id) : undefined,
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/`,
    bodyMap
  );
  return {
    id: result.pk,
    ...result
  };
}

async function updateKeyPleading({ idParams, body }) {
  const bodyMap = body
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/${idParams.affId}/`,
    bodyMap
  );
  return result;
}

async function removeKeyPleading({ matterId, depositionId, affId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/affs/${affId}/`
  );
  return result;
}

// comments
async function getDataCommentKeyPleading({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/${idParams.id}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentKeyPleading({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/${idParams.id}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentKeyPleading({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/${idParams.id}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentKeyPleading({ matterId, depositionId, id, commentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/affs/${id}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}

export default {
  getDataFromApi,
  addKeyPleading,
  updateKeyPleading,
  removeKeyPleading,
  getDataCommentKeyPleading,
  addCommentKeyPleading,
  updateCommentKeyPleading,
  removeCommentKeyPleading,
  getDataDetailFromApi
};
