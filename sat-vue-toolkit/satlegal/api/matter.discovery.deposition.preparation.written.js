import { get, post, patch, remove } from "./base";
// import { dataWritten } from "../mock-data/matter.discovery.deposition.preparation.written";
import { formatQuery, getFormData2 } from '../utils';

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    id: x.pk,
    date: x.publish_date,
    name: x.name,
    publisher: x.publisher,
    description: x.desc,
    attachments: x.attachment,
    labels: x.labels.map(x => x.pk),
  }
}

function mapBody(x) {
  return {
    publish_date: x.date,
    name: x.name,
    publisher: x.publisher,
    desc: x.description,
    attachment: x.attachments,
    labels: x.labels,
  }
}

async function getDataWritten({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/written-articles/`;
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

async function addWritten({ idParams, body }) {
  const formData = getFormData2(mapBody(body));
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/written-articles/`,
    formData
  );
  return mapObjectResult(result);
}

async function updateWritten({ idParams, body }) {
  const formData = getFormData2(mapBody(body), [null, undefined]);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/written-articles/${idParams.writtenId}/`,
    formData
  );
  return mapObjectResult(result);
}

async function removeWritten({ matterId, depositionId, writtenId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/written-articles/${writtenId}/`,
  );
  return result;
}

export default {
  getDataWritten,
  addWritten,
  updateWritten,
  removeWritten
};
