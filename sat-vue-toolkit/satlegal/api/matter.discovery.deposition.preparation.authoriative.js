import { get, post, patch, remove } from "./base";
// import { dataAuthoriative } from "../mock-data/matter.discovery.deposition.preparation.authoriative";
import { formatQuery } from '../utils';

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    id: x.pk,
    authoriative_treatise: x.treatise,
    treatise_description: x.desc,
    labels: x.labels.map(x => x.pk),
    authoriative_person: x.person,
    person_description: x.person_desc,
    person_labels: x.person_labels.map(x => x.pk),
  }
}

function mapBody(x) {
  return {
    treatise: x.authoriative_treatise,
    desc: x.treatise_description,
    labels: x.labels,
    person: x.authoriative_person,
    person_desc: x.person_description,
    person_labels: x.person_labels,
  }
}

async function getDataAuthoriative({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/authoritatives/`;
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

async function addAuthoriative({ idParams, body }) {
  const formData = mapBody(body);
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/authoritatives/`,
    formData
  );
  return mapObjectResult(result);
}

async function updateAuthoriative({ idParams, body }) {
  const formData = mapBody(body);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/authoritatives/${idParams.authoriativeId}/`,
    formData
  );
  return mapObjectResult(result);
}

async function removeAuthoriative({ matterId, depositionId, authoriativeId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/authoritatives/${authoriativeId}/`,
  );
  return result;
}

export default {
  getDataAuthoriative,
  addAuthoriative,
  updateAuthoriative,
  removeAuthoriative
};
