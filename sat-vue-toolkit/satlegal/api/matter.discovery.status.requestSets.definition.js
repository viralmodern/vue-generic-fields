import { get, post, patch, remove } from "./base";

async function getDataDefinition({ matterId, requestSetId, page }) {
  const { results, count } = await get(
    `/api/matters/${matterId}/request-sets/${requestSetId}/definitions/`,
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
    `/api/matters/${idParams.matterId}/request-sets/${
      idParams.requestSetId
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
    `/api/matters/${idParams.matterId}/request-sets/${
      idParams.requestSetId
    }/definitions/${idParams.definitionId}`,
    bodyMap
  );
  return result;
}

async function removeDefinition({ matterId, requestSetId, definitionId }) {
  const result = await remove(
    `/api/matters/${matterId}/request-sets/${requestSetId}/definitions/${definitionId}`
  );
  return result;
}

export default {
  getDataDefinition,
  addDefinition,
  updateDefinition,
  removeDefinition
};
