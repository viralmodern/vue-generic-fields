import { get, post, patch, remove } from "../../base";
import { formatQuery, getFormData2 } from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return {
      id: x.pk,
      ...x
    };
  });
}

async function getDataKeyExhibit({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/`;
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

async function getDataKeyExhibitDetail(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/${idParams.keyExhibitId}/`;
  const result = await get(url);
  return { ...result, id: result.pk }
}


async function addKeyExhibit({ idParams, body }) {
  const formData = getFormData2(body);
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/`,
    formData
  );
  return {
    id: result.pk,
    name: result.name,
    order: result.order,
    date: result.date,
    desc: result.desc,
    attachment: result.attachment,
    labels: result.labels,
    comments: result.comments,
    follow_up: result.follow_up
  };
}

async function updateKeyExhibit({ idParams, body }) {
  const formData = getFormData2(body, [null, undefined]);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/${idParams.keyExhibitId}/`,
    formData
  );
  return result;
}

async function removeKeyExhibit({ matterId, depositionId, keyExhibitId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/exhibits/${keyExhibitId}/`
  );
  return result;
}

// comments
async function getDataCommentKeyPleading({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/${idParams.keyPleadingId}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentKeyPleading({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/${idParams.keyPleadingId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentKeyPleading({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/${idParams.keyPleadingId}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentKeyPleading({ matterId, depositionId, keyPleadingId, commentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/exhibits/${keyPleadingId}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}

export default {
  getDataKeyExhibit,
  addKeyExhibit,
  updateKeyExhibit,
  removeKeyExhibit,
  getDataCommentKeyPleading,
  addCommentKeyPleading,
  updateCommentKeyPleading,
  removeCommentKeyPleading,
  getDataKeyExhibitDetail,
};
