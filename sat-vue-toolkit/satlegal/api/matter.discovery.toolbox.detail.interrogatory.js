import { get, post, patch, remove } from "./base";
// import { dataInterrogatory } from "../mock-data/matter.toolbox.interrogatory";

async function getDataInterrogatory({matterId, toolboxId, page}) {
  const { results, count } = await get(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/interrogatories/interrogatory/`,
    {
      params: {
        page
      }
    }
  );
  const dataMap = results.map(x => {
    return {
      id:x.pk,
      interrogatory: x.interrogatory,
      resDes: x.response_desc,
      objection: x.objection,
      tags: x.tags.map(x => x.pk),
      characters: []
    };
  });
  return {
    results: dataMap,
    count
  };
}

async function addInterrogatory({idParams, body}) {
  const bodyMap = {
    interrogatory: body.interrogatory,
    response_desc: body.resDes,
    objection: body.objection,
    tags: body.tags
  };
  const result = await post(`/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/interrogatories/interrogatory/`, bodyMap);
  return {
    id: result.pk,
    interrogatory: result.interrogatory,
    resDes: result.response_desc,
    objection: result.objection,
    tags: result.tags,
    characters: []
  };
}

async function updateInterrogatory({idParams, body}) {
  const bodyMap = {
    interrogatory: body.interrogatory,
    response_desc: body.resDes,
    objection: body.objection,
    tags: body.tags
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/interrogatories/interrogatory/${
      idParams.interrogatoryId
    }/`,
    bodyMap
  );
  return result;
}

async function removeInterrogatory({matterId, toolboxId, interrogatoryId}) {
  const result = await remove(`/api/matters/${matterId}/toolboxes/${toolboxId}/interrogatories/interrogatory/${interrogatoryId}/`);
  return result;
}

export default {
  getDataInterrogatory,
  addInterrogatory,
  updateInterrogatory,
  removeInterrogatory
};
