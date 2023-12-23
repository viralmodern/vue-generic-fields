import { get, post, patch, remove } from "./base";
// import { dataGiven } from "../mock-data/matter.discovery.deposition.preparation.given";
import { formatQuery, getFormData2 } from '../utils';

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    id: x.pk,
    date: x.deposition_date,
    case: x.case,
    transcript: x.able_transcript,
    description: x.desc,
    attachments: x.attachment,
    labels: x.labels.map(x => x.pk),
  }
}

function mapBody(x) {
  return {
    deposition_date: x.date,
    case: x.case,
    able_transcript: x.transcript,
    desc: x.description,
    attachment: x.attachments,
    labels: x.labels,
  }
}

async function getDataGiven({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/`;
  const options = {
    params: formatQuery(searchObject)
  }
  const group = {};
  Array.isArray(searchObject.group_items) && searchObject.group_items.forEach(key => {
    group[key] = {
      pk: +key,
      list: [],
      totals: 0,
    }
  });
  const result = await get(url, options);
  if (!searchObject.ungroup) {
    for (let key in result) {
      const list = mapResult(result[key].results);
      result[key] = {
        pk: +key,
        list,
        totals: result[key].count || 0
      }
    }
    return {...group, ...result};
  }
  return {
    all: {
      pk: 'all',
      list: mapResult(result.results),
      totals: result.count,
    }
  }
}

async function addGiven({ idParams, body }) {
  const formData = getFormData2(mapBody(body));
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/`,
    formData
  );
  return mapObjectResult(result);
}

async function updateGiven({ idParams, body }) {
  const formData = getFormData2(mapBody(body), [null, undefined]);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/given-depositions/${idParams.givenId}/`,
    formData
  );
  return mapObjectResult(result);
}

async function removeGiven({ matterId, depositionId, givenId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/given-depositions/${givenId}/`,
  );
  return result;
}

export default {
  getDataGiven,
  addGiven,
  updateGiven,
  removeGiven
};
