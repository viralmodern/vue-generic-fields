import { get, post, patch, remove, put } from "../../base";
import {
  formatQuery,
  getFieldNullAble,
  getFieldArrayNullAble,
  getFieldObjectNullAble,
} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    const result = {
      ...x,
      legal_counsels: x.legal_counsels.map(x => {
        return {
          id: x.pk,
          name: `${x.last_name} ${x.first_name}`,
          avatarUrl: x.avatar
        };
      }),
    }
    if (x.deponent) {
      result.deponent = {
        id: x.deponent.pk,
        name: `${x.deponent.last_name} ${x.deponent.first_name}`,
        avatarUrl: x.deponent.avatar
      }
    }
    return result;
  });
}

function mapObjectResult2(x) {
  const result = {
    ...x,
    legal_issues: x.legal_issues.map(i => i.pk),
    labels: x.labels.map(i => i.pk),
  };
  if (x.deponent) {
    result.deponent = {
      id: x.deponent.pk,
      name: `${x.deponent.last_name} ${x.deponent.first_name}`,
      avatarUrl: x.deponent.avatar
    }
  }
  return result;
}

async function getDataDeposition({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/`;
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

async function addDeposition({ idParams, body }) {
  const bodyMap = {
    ...body,
    members: getFieldArrayNullAble(body.members),
    deponent_type: getFieldNullAble(body.deponent_type),
    deponent: getFieldObjectNullAble(body.deponent),
    method: getFieldNullAble(body.method),
    priority: getFieldNullAble(body.priority),
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/`,
    bodyMap
  );
  return mapObjectResult2(result);
}

async function updateDeposition({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  if (body.legal_counsels) {
    bodyMap.legal_counsels = body.legal_counsels.map(x => x.id);
  }
  if (body.characters) {
    bodyMap.characters = body.characters.map(x => x.id);
  }
  if (body.deponent) {
    bodyMap.deponent = body.deponent.id;
  }
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/`,
    bodyMap
  );
  return mapObjectResult2(result);
}

async function removeDeposition({ matterId, depositionId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/`
  );
  return result;
}

async function updateFactDetail(payload) {
  const bodyMap = {
    ...payload.item,
    characters: payload.item.characters.map(x => x.id)
  };
  let result = await put(
    `/api/matters/${payload.matterId}/depositions/${payload.depositionId}/`,
    bodyMap
  );
  return mapObjectResult2(result);
}
async function getFactDetail(data) {
  const result = await get(
    `/api/matters/${data.matterId}/depositions/${data.depositionId}/`
  );
  return {
    ...result,
    subjects: result.subjects.map(s => s.pk),
    characters: result.characters.map(x => {
      return {
        id: x.character.pk,
        name: `${x.character.last_name} ${x.character.first_name}`,
        avatarUrl: x.character.avatar
      };
    }),
    legal_issues: result.legal_issues.map(i => i.pk),
    sources: result.sources.map(i => i.pk),
    tags: result.tags.map(i => i.pk)
  };
}

async function updateReport({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.rowId}/reports/`;
  let result = {}
  if (body) {
    result = await remove(`${url}${body.pk}/`)
  }
  else {
    result = await post(url, { reason: 's' })
  }
  return result
}

export default {
  getDataDeposition,
  addDeposition,
  updateDeposition,
  removeDeposition,
  getFactDetail,
  updateFactDetail,
  updateReport
};
