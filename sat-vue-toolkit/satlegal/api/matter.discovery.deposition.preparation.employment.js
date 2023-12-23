import { sleep, get, post, remove, patch } from "./base";
import { formatQuery, getFormData2 } from '../utils';

// import { dataEmployment } from "../mock-data/matter.discovery.deposition.priorExperience";

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
    role: x.role,
    case_name: x.case_name,
    who_win: x.who_win,
    attachment: x.attachment,
    testimony: x.testimony,
  }
}

function mapBody(x) {
  return {
    from_year: x.from,
    to_year: x.to,
    title: x.title,
    role: x.role,
    case_name: x.case_name,
    who_win: x.who_win,
    attachment: x.attachment,
    testimony: x.testimony,
  }
}

async function getDataEmployment({idParams, searchObject}) {
  await sleep();
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/`;
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
async function addDataEmployment({idParams, body}) {
  const bodyMap = getFormData2({...mapBody(body), deposition: idParams.depositionId}, [null, undefined]);
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/`,
    bodyMap
  );
  return mapObjectResult(result);
}
async function updateDataEmployment({idParams, body}){
  const bodyMap = getFormData2(mapBody(body), [null, undefined]);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/${idParams.employmentId}/`,
    bodyMap
  );
  return mapObjectResult(result);
}
async function removeEmployment({ matterId, depositionId, employmentId }){
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/prior-employments/${employmentId}/`,
  );
  return result;
}

export default {
  getDataEmployment,
  addDataEmployment,
  updateDataEmployment,
  removeEmployment
};
