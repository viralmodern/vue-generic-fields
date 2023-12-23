import { get, post, patch, remove } from "./base";
import { formatQuery } from '../utils';

// import { dataPriorStatement } from "../mock-data/matter.discovery.deposition.preparation.priorStatement";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    id: x.pk,
    interrogatory_question: x.i_question,
    interrogatory_answer: x.i_answer,
    make_by: x.make_by.pk,
    question: x.question,
    answer: x.answer,
    alert: x.alert,
    follow_up: x.follow_up,
    comment: x.comments || []
  }
}

function bodyResult(x) {
  return {
    i_question: x.interrogatory_question,
    i_answer: x.interrogatory_answer,
    make_by: x.make_by,
    question: x.question,
    answer: x.answer,
    alert: x.alert,
    follow_up: x.follow_up,
  }
}

async function getDataPriorStatement({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-statements/`;
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

async function getDataCommentPriorStatement({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-statements/${idParams.priorStatementId}/comments/`;
  const options =  {
    params: query,
  }
  const result = await get(url, options);
  return {
    results: result.results,
    count: result.count,
  };
}

async function addPriorStatement({ idParams, body }) {
  const bodyMap = bodyResult(body);
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-statements/`,
    bodyMap
  );
  return mapObjectResult(result);
}

async function addCommentPriorStatement({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-statements/${idParams.priorStatementId}/comments/`;
  const result = await post(url, body);
  return result;
}

async function updatePriorStatement({ idParams, body }) {
  const bodyMap = bodyResult(body);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-statements/${idParams.priorStatementId}/`,
    bodyMap
  );
  return mapObjectResult(result);
}

async function removePriorStatement({ matterId, depositionId, priorStatementId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/prior-statements/${priorStatementId}/`,
  );
  return result;
}

export default {
  getDataPriorStatement,
  getDataCommentPriorStatement,
  addPriorStatement,
  addCommentPriorStatement,
  updatePriorStatement,
  removePriorStatement
};
