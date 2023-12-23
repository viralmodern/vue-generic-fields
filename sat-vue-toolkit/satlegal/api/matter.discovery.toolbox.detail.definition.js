import { get, post, patch, remove } from "./base";

async function getDataDefinition({ urlByType, matterId, toolboxId, page }) {
  const { results, count } = await get(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/${urlByType}/definitions/`,
    {
      params: {
        page
      }
    }
  );
  const dataMap = results.map(x => {
    return {
      id: x.pk,
      name: x.term,
      definition: x.short_desc,
      description: x.desc
    };
  });
  return {
    results: dataMap,
    count
  };
}

async function addDefinition({ idParams, body }) {
  const bodyMap = {
    term: body.name,
    short_desc: body.definition,
    desc: body.description
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/${
      idParams.urlByType
    }/definitions/`,
    bodyMap
  );
  return {
    id: result.pk,
    name: result.term,
    definition: result.short_desc,
    description: result.desc
  };
}

async function updateDefinition({ idParams, body }) {
  const bodyMap = {
    term: body.name,
    short_desc: body.definition,
    desc: body.description
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/${
      idParams.urlByType
    }/definitions/${idParams.definitionId}`,
    bodyMap
  );
  return result;
}

async function removeDefinition({urlByType, matterId, toolboxId, definitionId}) {
  const result = await remove(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/${
      urlByType
    }/definitions/${definitionId}`
  );
  return result;
}

export default {
  getDataDefinition,
  addDefinition,
  updateDefinition,
  removeDefinition
};
