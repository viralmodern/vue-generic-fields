import { get, post, patch, remove } from "./base";
// import { dataExhibits } from "../mock-data/matter.discovery.deposition.preparation.exhibits";
import { formatQuery, getFormData2 } from '../utils';

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    id: x.pk,
    name: x.name,
    date: x.date,
    desc: x.desc,
    attachment: x.attachment,
    order: x.order,
    highlight: "chua biet",
    labels: x.labels.map(x => x.pk),
    page: 2,
    question: x.question,
    answer: x.answer,
    follow_up: x.follow_up,
    comment: x.comments || []
  }
}

async function getDataExhibits({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/`;
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

async function getDataCommentExhibits({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/${idParams.exhibitsId}/comments/`;
  const options =  {
    params: query,
  }
  const result = await get(url, options);
  return {
    results: result.results,
    count: result.count,
  };
}

async function addExhibits({ idParams, body }) {
  const formData = getFormData2(body);
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/`,
    formData
  );
  return mapObjectResult(result);
}

async function addCommentExhibits({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/${idParams.exhibitsId}/comments/`;
  const result = await post(url, body);
  return result;
}

async function updateExhibits({ idParams, body }) {
  const formData = getFormData2(body, [null, undefined]);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/exhibits/${idParams.exhibitsId}/`,
    formData
  );
  return mapObjectResult(result);
}

async function removeExhibits({ matterId, depositionId, exhibitsId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/exhibits/${exhibitsId}/`,
  );
  return result;
}

export default {
  getDataExhibits,
  getDataCommentExhibits,
  addExhibits,
  addCommentExhibits,
  updateExhibits,
  removeExhibits
};
