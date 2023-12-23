import { get, post, patch, remove } from "./base";
// import { dataAffidavitStatement } from "../mock-data/matter.discovery.deposition.preparation.affidavitStatement";
import { formatQuery } from '../utils';

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    id: x.pk,
    name: x.name,
    date: x.date_made,
    make_by: x.make_by.pk,
    question: x.question,
    answer: x.answer,
    perjury_risk: x.perjury_risk,
    follow_up: x.follow_up,
    comment: x.comments || []
  }
}

function bodyResult(x) {
  return {
    name: x.name,
    date_made: x.date,
    make_by: x.make_by,
    question: x.question,
    answer: x.answer,
    perjury_risk: x.perjury_risk,
    follow_up: x.follow_up,
    comment: x.comments,
  }
}

async function getDataAffidavitStatement({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/`;
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

async function getDataCommentAffs({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/${idParams.affsId}/comments/`;
  const options =  {
    params: query,
  }
  const result = await get(url, options);
  return {
    results: result.results,
    count: result.count,
  };
}

async function addAffidavitStatement({ idParams, body }) {
  const bodyMap = bodyResult(body);
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/`,
    bodyMap
  );
  return mapObjectResult(result);
}

async function addCommentAffs({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/${idParams.affsId}/comments/`;
  const result = await post(url, body);
  return result;
}

async function updateAffidavitStatement({ idParams, body }) {
  const bodyMap = bodyResult(body);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/affs/${idParams.affidavitStatementId}/`,
    bodyMap
  );
  return mapObjectResult(result);
}

async function removeAffidavitStatement({ matterId, depositionId, affidavitStatementId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/affs/${affidavitStatementId}/`,
  );
  return result;
}

export default {
  getDataAffidavitStatement,
  getDataCommentAffs,
  addAffidavitStatement,
  addCommentAffs,
  updateAffidavitStatement,
  removeAffidavitStatement
};
