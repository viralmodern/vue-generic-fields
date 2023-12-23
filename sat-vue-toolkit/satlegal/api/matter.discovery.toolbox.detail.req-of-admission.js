import { get, post, patch, remove } from "./base";
// import { dataAdmission } from "../mock-data/matter.toolbox.request-of-admission";

async function getDataAdmission({matterId, toolboxId, page}) {
  const { results, count } = await get(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/request-for-admissions/request-for-admission/`,
    {
      params: {
        page
      }
    }
  );
  const dataMap = results.map(x => {
    return {
      id: x.pk,
      admissionDes: x.request_desc,
      admissionResDes: x.response_desc,
      admit: x.objection,
      tags: x.tags.map(x => x.pk),
      characters: []
    };
  });
  return {
    results: dataMap,
    count
  };
}

async function addAdmission({idParams, body}) {
  const bodyMap = {
    request_desc: body.admissionDes,
    response_desc: body.admissionResDes,
    objection: body.admit,
    tags: body.tags
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/toolboxes/${
      idParams.toolboxId
    }/request-for-admissions/request-for-admission/`,
    bodyMap
  );
  return {
    id: result.pk,
    admissionDes: result.request_desc,
    admissionResDes: result.response_desc,
    admit: result.objection,
    tags: result.tags,
    characters: []
  };
}

async function updateAdmission({idParams, body}) {
  const bodyMap = {
    request_desc: body.admissionDes,
    response_desc: body.admissionResDes,
    objection: body.admit,
    tags: body.tags
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/toolboxes/${
      idParams.toolboxId
    }/request-for-admissions/request-for-admission/${idParams.admissionId}/`,
    bodyMap
  );
  return result;
}

async function removeAdmission({matterId, toolboxId, admissionId}) {
  const result = await remove(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/request-for-admissions/request-for-admission/${admissionId}/`
  );
  return result;
}

export default {
  getDataAdmission,
  addAdmission,
  updateAdmission,
  removeAdmission
};
