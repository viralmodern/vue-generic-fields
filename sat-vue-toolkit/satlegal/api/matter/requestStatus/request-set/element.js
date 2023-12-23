import { get, post, remove, patch } from "../../../base";
import { formatQuery } from "@/sat-vue-toolkit/satlegal/utils";

async function getDataRequestSetItemElement({ idParams, searchObject }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/elements/`;
  const options = {
    params: formatQuery(searchObject)
  };
  const result = await get(url, options);
  const results = result.results.map(x => {
    if(!x.relations_info) {
      // không thấy api trả về nên hard
      x.relations_info = {
        total_relations: 0,
        total_first_class_relations: 0,
        first_class_relations: []
      }
    }
    return x;
  });
  return {
    results,
    count: result.count
  };
}
async function addDataRequestSetItemElement({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/items/${idParams.requestSetItemId}/elements/`;
  const result = await post(url, body);
  if(!result.relations_info) {
    // không thấy api trả về nên hard
    result.relations_info = {
      total_relations: 0,
      total_first_class_relations: 0,
      first_class_relations: []
    }
  }
  return result;
}
async function updateDataRequestSetItemElement({ idParams, body }) {
  const bodyMap = {
    ...body,
  }
  if(body.request_item) {
    bodyMap.request_item = body.request_item.pk
  }
  const url = `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/items/${idParams.requestSetItemId}/elements/${idParams.requestSetItemElementId}/`;
  const result = await patch(url, bodyMap);
  return result;
}
async function removeRequestSetItemElement(data) {
  const result = await remove(
    `/api/matters/${data.matterId}/request-sets/${data.requestSetId}/items/${data.requestSetItemId}/elements/${data.requestSetItemElementId}/`
  );
  return result;
}

// relations
async function updateRelationRequestSetItemElement({ idParams, body }) {
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
    `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/items/${idParams.requestSetItemId}/elements/${idParams.requestSetItemElementId}/relations/`,
    bodyMap
  );
  return result;
}

async function removeRelationRequestSetItemElement(data) {
  return await remove(`/api/matters/${data.matterId}/request-sets/${data.requestSetId}/items/${data.requestSetItemId}/elements/${data.requestSetItemElementId}/relations/${data.contentTypeId}/${data.objectId}/`)
}

export default {
  getDataRequestSetItemElement,
  addDataRequestSetItemElement,
  updateDataRequestSetItemElement,
  removeRequestSetItemElement,

  // relations
  updateRelationRequestSetItemElement,
  removeRelationRequestSetItemElement,
};
