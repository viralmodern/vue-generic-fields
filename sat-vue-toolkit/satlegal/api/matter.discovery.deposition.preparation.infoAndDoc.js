import { get, post, patch, remove } from "./base";
// import { dataInfoAndDoc } from "../mock-data/matter.discovery.deposition.preparation.infoAndDoc";
import { formatQuery, getFormData2 } from '../utils';

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    id: x.pk,
    date: x.date_received,
    received_item: x.received_item,
    description: x.desc,
    attachments: x.attachment,
    labels: x.labels.map(x => x.pk),
  }
}

function mapBody(x) {
  return {
    date_received: x.date,
    received_item: x.received_item,
    desc: x.description,
    attachment: x.attachments,
    labels: x.labels,
  }
}

async function getDataInfoAndDoc({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/`;
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

async function addInfoAndDoc({ idParams, body }) {
  const formData = getFormData2(mapBody(body));
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/`,
    formData
  );
  return mapObjectResult(result);
}

async function updateInfoAndDoc({ idParams, body }) {
  const formData = getFormData2(mapBody(body), [null, undefined]);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/info-and-docs-experts/${idParams.infoAndDocId}/`,
    formData
  );
  return mapObjectResult(result);
}

async function removeInfoAndDoc({ matterId, depositionId, infoAndDocId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/info-and-docs-experts/${infoAndDocId}/`,
  );
  return result;
}

export default {
  getDataInfoAndDoc,
  addInfoAndDoc,
  updateInfoAndDoc,
  removeInfoAndDoc
};
