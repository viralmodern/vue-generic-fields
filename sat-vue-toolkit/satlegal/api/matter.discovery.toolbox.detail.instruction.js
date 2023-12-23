import { get, post, patch, remove } from "./base";

async function getDataInstruction({ urlByType, matterId, toolboxId, page }) {
  const { results, count } = await get(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/${urlByType}/instructions/`,
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
    `/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/${
      idParams.urlByType
    }/instructions/`,
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
    `/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/${
      idParams.urlByType
    }/instructions/${idParams.instructionId}`,
    bodyMap
  );
  return result;
}

async function removeInstruction({urlByType, matterId, toolboxId, instructionId}) {
  const result = await remove(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/${
      urlByType
    }/instructions/${instructionId}`
  );
  return result;
}

export default {
  getDataInstruction,
  addInstruction,
  updateInstruction,
  removeInstruction
};
