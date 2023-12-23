import { sleep, get, post, remove, patch } from "./base";
import { formatQuery, getFormData2 } from '../utils';

// import { dataPriorExperience } from "../mock-data/matter.discovery.deposition.priorExperience";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    id: x.pk,
    from: x.from_year,
    to: x.to_year,
    title: x.title,
    description: x.desc,
    employer_name: x.employer_name,
    address: x.address,
    attachment: x.attachment
  }
}

function mapBody(x) {
  return {
    from_year: x.from,
    to_year: x.to,
    title: x.title,
    desc: x.description,
    employer_name: x.employer_name,
    address: x.address,
    attachment: x.attachment,
  }
}

async function getDataPriorExperience({idParams, searchObject}) {
  await sleep();
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/`;
  const options = {
    params: formatQuery(searchObject)
  }
  const result = await get(url, options);
  const results = mapResult(result.results);
  return {
    results,
    count: result.count,
  };
}
async function addDataPriorExperience({idParams, body}) {
  const bodyMap = getFormData2(mapBody(body));
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/`,
    bodyMap
  );
  return mapObjectResult(result);
}
async function updateDataPriorExperience({idParams, body}){
  const bodyMap = getFormData2(mapBody(body), [null, undefined]);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-experiences/${idParams.priorExperienceId}/`,
    bodyMap
  );
  return mapObjectResult(result);
}
async function removePriorExperience({ matterId, depositionId, priorExperienceId }){
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/prior-experiences/${priorExperienceId}/`,
  );
  return result;
}

export default {
  getDataPriorExperience,
  addDataPriorExperience,
  updateDataPriorExperience,
  removePriorExperience
};
