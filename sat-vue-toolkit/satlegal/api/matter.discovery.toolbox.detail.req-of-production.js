import { get, post, patch, remove } from "./base";
// import { dataProduction } from "../mock-data/matter.toolbox.request-of-production";

async function getDataProduction({matterId, toolboxId, page}) {
  const { results, count } = await get(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/request-for-prods/request-for-prod/`,
    {
      params: {
        page
      }
    }
  );
  const dataMap = results.map(x => {
    return {
      id:x.pk,
      reqDes: x.request_desc,
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

async function addProduction({idParams, body}) {
  const bodyMap = {
    request_desc: body.reqDes,
    response_desc: body.resDes,
    objection: body.objection,
    tags: body.tags
  };
  const result = await post(`/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/request-for-prods/request-for-prod/`, bodyMap);
  return {
    id: result.pk,
    reqDes: result.request_desc,
    resDes: result.response_desc,
    objection: result.objection,
    tags: result.tags,
    characters: []
  };
}

async function updateProduction({idParams, body}) {
  const bodyMap = {
    request_desc: body.reqDes,
    response_desc: body.resDes,
    objection: body.objection,
    tags: body.tags
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/toolboxes/${idParams.toolboxId}/request-for-prods/request-for-prod/${
      idParams.productionId
    }/`,
    bodyMap
  );
  return result;
}

async function removeProduction({matterId, toolboxId, productionId}) {
  const result = await remove(`/api/matters/${matterId}/toolboxes/${toolboxId}/request-for-prods/request-for-prod/${productionId}/`);
  return result;
}

export default {
  getDataProduction,
  addProduction,
  updateProduction,
  removeProduction
};
