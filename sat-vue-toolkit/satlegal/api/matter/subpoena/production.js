import { get, patch, remove, post } from "../../base";
import {
  formatQuery, getFieldNullAble, getFormData2
} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return {
      ...x,
      id: x.pk,
    };
  });
}

async function getAllDataProductionNoGroupBy({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId ? idParams.subpoenaId + "/productions/" : "all-request-productions/"}`;
  const options = {
    params: formatQuery({ ...searchObject, ungroup: true })
  };
  const result = await get(url, options);
  return result;
}

async function getDataFromApi({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/productions/`;
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
    `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/productions/${idParams.rowId}/`,
    body
  );
  return {
    ...result,
    id: result.pk,
  };
}
async function removeRequestApi(payload) {
  return await remove(
    `/api/matters/${payload.matterId}/subpoenas/${payload.subpoenaId}/productions/${payload.rowId}`
  );
}

async function getDataAttachment({ idParams, query }) {
  const url = `api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/productions/${idParams.rowId}/attachments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;

}


// attachment
async function addAttachment({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/productions/${idParams.requestForProductionId}/attachments/`;
  const result = await post(url, getFormData2(body));
  return result;
}

async function updateAttachment({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/productions/${idParams.requestForProductionId}/attachments/${idParams.attachmentId}/`;
  const result = await patch(url, getFormData2(body));
  return result;
}

async function removeAttachment({ matterId, subpoenaId, requestForProductionId, attachmentId }) {
  const url = `/api/matters/${matterId}/subpoenas/${subpoenaId}/productions/${requestForProductionId}/attachments/${attachmentId}/`;
  const result = await remove(url);
  return result;
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

// notes
async function getNotes({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/productions/${idParams.rowId}/notes/`;
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

function mapDataAddUpdateNotes(data) {
  return {
    title: data.name,
    text: data.content
  };
}

async function addNotes({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/productions/${idParams.rowId}/notes/`;
  const result = await post(url, bodyMap);
  return result;
}

async function updateNotes({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/productions/${idParams.rowId}/notes/${idParams.noteId}/`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeNotes({ matterId, subpoenaId, rowId, noteId }) {
  const url = `/api/matters/${matterId}/subpoenas/${subpoenaId}/productions/${rowId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}

async function addProduction({ idParams, body }) {
  const bodyMap = {
    ...body,
    priority: getFieldNullAble(body.priority)
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/productions/`,
    bodyMap
  );
  return {
    ...result,
    id: result.pk,
  };
}

export default {
  getAllDataProductionNoGroupBy,
  getDataFromApi,
  patchRequestApi,
  removeRequestApi,
  getDataAttachment,
  addAttachment,
  removeAttachment,
  getNotes,
  addNotes,
  updateNotes,
  removeNotes,
  addProduction,
  updateAttachment,
};
