import { get, post, remove, patch } from "../base";
import {
  formatQuery, getFormData2
} from "../../utils";

async function getDataClients({ searchObject = {} }) {
  const url = "/api/clients/";
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
      const results = result[key].results;
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
      results: result.results || [],
      totals: result.count || 0,
      next: result.next
    }
  };
}

async function UpdateClient({ idParams, body }) {
  const mapBody = {
    ...body
  }
  const result = await patch(`api/clients/${idParams.pk}/`, !body.extra_info ? getFormData2(mapBody) : body);
  return result;
}

async function addClient({ body }) {
  const result = await post('api/clients/', body);
  return result;
}

async function postManagers({ idParams, body }) {
  const result = await post(`api/clients/${idParams.pk}/managers/`, body);
  return result;
}

async function removeManagers({ pk, value }) {
  const result = await remove(`api/clients/${pk}/managers/${value}`);
  return result;
}

async function removeRequestApi({ id }) {
  const result = await remove(
    `/api/clients/${id}/`
  );
  return result;
}

async function getClientDetail(pk) {
  const url = `/api/clients/${pk}/`;
  const result = await get(url);
  return result
}

async function getDataNotes({ idParams, query = {} }) {
  const url = `/api/clients/${idParams.noteId}/notes/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  const data = result.results.map(x => ({
    id: x.pk,
    title: x.title,
    content: x.text,
    creator: x.creator,
    createdAt: x.created,
  }))
  return {
    results: data,
    count: result.count,
  };
}

async function addNotes({ idParams, body }) {
  const url = `/api/clients/${idParams.rowId}/notes/`;
  const result = await post(url, body);
  return result;
}

async function updateNotes({ idParams, body }) {
  const url = `/api/clients/${idParams.rowId}/notes/${idParams.noteId}`;
  const result = await patch(url, body);
  return result;
}

async function removeNotes({ rowId, noteId }) {
  const url = `/api/clients/${rowId}/notes/${noteId}`;
  const result = await remove(url);
  return result;
}

async function updateRelationCharacter({ idParams, body }) {
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
    `/api/clients/${idParams.id}/relations/`,
    bodyMap
  );
  return result;
}

async function removeRelationCharacter(data) {
  return await remove(`/api/clients/${data.id}/relations/${data.contentTypeId}/${data.objectId}/`)
}

async function getWorkSpaceMembers(params) {
  const results = await get('/api/workspace/members/', params);
  return results;
}

async function labelsWorkSpace(params) {
  const result = await get('/api/client-labels/', params);
  return result.results || [];
}
async function addMatter(body) {
  const result = await post('/api/matters/', body);
  return result;
}
async function addMeeting(body) {
  const result = await post('/api/legal-meetings/', body);
  return result;  
}

async function updateAddress({ idParams, body }) {
  const url = `api/clients/${idParams.clientId}/addresses/${idParams.pk}/`;
  const result = await patch(url, body);
  return result
}

async function postAddress({ idParams, body }) {
  const url = `api/clients/${idParams.clientId}/addresses/`;
  const result = await post(url, body);
  return result
}

async function removeAddress({ pk, clientId }) {
  const url = `api/clients/${clientId}/addresses/${pk}/`;
  const result = await remove(url);
  return result
}

export default {
  getDataClients,
  UpdateClient,
  removeRequestApi,
  addNotes,
  updateNotes,
  removeNotes,
  getDataNotes,
  updateRelationCharacter,
  removeRelationCharacter,
  getWorkSpaceMembers,
  labelsWorkSpace,
  addMatter,
  addMeeting,
  postManagers,
  removeManagers,
  getClientDetail,
  updateAddress,
  postAddress,
  removeAddress,
  addClient
};
