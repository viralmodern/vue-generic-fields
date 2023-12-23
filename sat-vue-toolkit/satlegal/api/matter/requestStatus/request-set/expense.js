import { get, post, patch, remove } from "../../../base";
import { formatQuery } from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
}

function mapObjectResult(x) {
  if(!x.relations_info) {
    // không thấy api trả về nên hard
    x.relations_info = {
      total_relations: 0,
      total_first_class_relations: 0,
      first_class_relations: []
    }
  }
  return x;
}


async function getDataRequestSetExpense({ searchObject = {} }) {
  const url = "/api/expenses/";
  const options = {
    params: formatQuery(searchObject)
  };
  const group = {};
  Array.isArray(searchObject.group_items) &&
    searchObject.group_items.forEach(key => {
      group[key] = {
        pk: +key,
        results: [],
        totals: 0,
        next: null
      };
    });
  const result = await get(url, options);
  if (!searchObject.ungroup) {
    for (let key in result) {
      result[key] = {
        pk: +key,
        results: mapResult(result[key].results),
        totals: result[key].count || 0,
        next: result[key].next
      };
    }
    return { ...group, ...result };
  }
  return {
    all: {
      pk: "all",
      results: mapResult(result.results),
      totals: result.count,
      next: result.next
    }
  };
}

async function getDataRequestSetExpenseDetail(idParams) {
  const url = `/api/expenses/${idParams.pk}/`;
  const result = await get(url);
  return result
}
async function addRequestSetExpense({ body }) {
  const url = "/api/expenses/";
  const result = await post(url, body);
  return mapObjectResult(result);
}

async function updateRequestSetExpense({ idParams, body }) {
  const url = `/api/expenses/${idParams.requestSetExpenseId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeRequestSetExpense(data) {
  const url = `/api/expenses/${data.requestSetExpenseId}/`;
  const result = await remove(url);
  return result;
}

// relations
async function updateRelationRequestSetExpense({ idParams, body }) {
  const bodyMap = {
    relations: [
      {
        content_type_id: body.content_type_id,
        object_id: body.pk.toString(),
        // name: body.name,
      }
    ]
  }
  const result = await post(
    `/api/expenses/${idParams.requestSetExpenseId}/relations/`,
    bodyMap
  );
  return result;
}

async function removeRelationRequestSetExpense(data) {
  return await remove(`/api/expenses/${data.requestSetExpenseId}/relations/${data.contentTypeId}/${data.objectId}/`)
}

export default {
  getDataRequestSetExpense,
  addRequestSetExpense,
  updateRequestSetExpense,
  removeRequestSetExpense,
  getDataRequestSetExpenseDetail,
  //relations
  updateRelationRequestSetExpense,
  removeRelationRequestSetExpense,
};
