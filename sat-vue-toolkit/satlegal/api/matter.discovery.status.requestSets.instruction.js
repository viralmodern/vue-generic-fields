import { get, post, patch, remove } from "./base";

async function getDataInstruction({ matterId, requestSetId, page }) {
  const { results, count } = await get(
    `/api/matters/${matterId}/request-sets/${requestSetId}/instructions/`,
    {
      params: {
        page
      }
    }
  );
  const dataMap = results.map(x => {
    return {
      id: x.pk,
      shortDescription: x.short_desc,
      description: x.desc
    };
  });
  return {
    results: dataMap,
    count
  };
}

async function addInstruction({ idParams, body }) {
  const bodyMap = {
    short_desc: body.shortDescription,
    desc: body.description
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/instructions/`,
    bodyMap
  );
  return {
    id: result.pk,
    shortDescription: result.short_desc,
    description: result.desc
  };
}

async function updateInstruction({ idParams, body }) {
  const bodyMap = {
    term: body.name,
    short_desc: body.shortDescription,
    desc: body.description
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/request-sets/${idParams.requestSetId}/instructions/${idParams.instructionId}`,
    bodyMap
  );
  return result;
}

async function removeInstruction({ matterId, requestSetId, instructionId }) {
  const result = await remove(
    `/api/matters/${matterId}/request-sets/${requestSetId}/instructions/${instructionId}`
  );
  return result;
}

export default {
  getDataInstruction,
  addInstruction,
  updateInstruction,
  removeInstruction
};
