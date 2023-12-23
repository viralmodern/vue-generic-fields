import { get, post, patch, remove } from "./base";

async function getDataGeneralObjection({ urlByType, matterId, toolboxId, page }) {
  const { results, count } = await get(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/${urlByType}/general-objections/`,
    {
      params: {
        page
      }
    }
  );
  const dataMap = results.map(x => {
    return {
      id: x.pk,
      generalObjection: x.objection,
      comment: x.objection_comment
    };
  });
  return {
    results: dataMap,
    count
  };
}

async function addGeneralObjection({ idParams, body }) {
  const bodyMap = {
    objection: body.generalObjection,
    objection_comment: body.comment
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/${
      idParams.urlByType
    }/general-objections/`,
    bodyMap
  );
  return {
    id: result.pk,
    generalObjection: result.objection,
    comment: result.objection_comment
  };
}

async function updateGeneralObjection({ idParams, body }) {
  const bodyMap = {
    objection: body.generalObjection,
    objection_comment: body.comment
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/${
      idParams.urlByType
    }/general-objections/${idParams.generalObjectId}`,
    bodyMap
  );
  return result;
}

async function removeGeneralObjection({urlByType, matterId, toolboxId, generalObjectId}) {
  const result = await remove(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/${
      urlByType
    }/general-objections/${generalObjectId}`
  );
  return result;
}

export default {
  getDataGeneralObjection,
  addGeneralObjection,
  updateGeneralObjection,
  removeGeneralObjection
};
