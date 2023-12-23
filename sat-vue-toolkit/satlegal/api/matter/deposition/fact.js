import { get, post, patch, remove, put } from "../../base";
import { formatQuery, getFieldNullAble, getFieldArrayObjectNullAble, getFieldArrayNullAble} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    ...x,
    id: x.pk,
    subjects: x.subjects,
    characters: x.characters.map(x => {
      return {
        id: x.character.pk,
        name: `${x.character.last_name} ${x.character.first_name}`,
        avatarUrl: x.character.avatar
      }
    }),
    legal_issues: x.legal_issues,
    location: x.location && x.location.extra,
  }
}

function mapObjectResult2(x) {
  return {
    ...x,
    id: x.pk,
    subjects: x.subjects.map(s => s.pk),
    characters: x.characters.map(x => {
      return {
        id: x.character.pk,
        name: `${x.character.last_name} ${x.character.first_name}`,
        avatarUrl: x.character.avatar
      }
    }),
    legal_issues: x.legal_issues.map(i => i.pk),
    sources: x.sources.map(i => i.pk),
    tags: x.tags.map(i => i.pk),
  }
}

async function getDataFacts({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/facts/`;
  const options = {
    params: formatQuery(searchObject)
  }
  const group = {};
  Array.isArray(searchObject.group_items) && searchObject.group_items.forEach(key => {
    group[key] = {
      pk: +key,
      results: [],
      totals: 0,
      next: null,
    }
  });
  const result = await get(url, options);
  if (!searchObject.ungroup) {
    for (let key in result) {
      const results = mapResult(result[key].results);
      result[key] = {
        pk: +key,
        results,
        totals: result[key].count || 0,
        next: result[key].next,
      }
    }
    return { ...group, ...result };
  }
  return {
    all: {
      pk: 'all',
      results: mapResult(result.results),
      totals: result.count,
      next: result.next,
    }
  }
}

async function addFacts({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/facts/`;
  const bodyMap = {
    ...body,
    characters: getFieldArrayObjectNullAble(body.characters),
    legal_issues: getFieldArrayNullAble(body.legal_issues),
    favorable: getFieldNullAble(body.favorable),
    dispute: getFieldNullAble(body.dispute),
    relevant_level: getFieldNullAble(body.relevant_level),
    value_level: getFieldNullAble(body.value_level),
    important_level: getFieldNullAble(body.important_level),
  }
  const result = await post(url, bodyMap);
  return mapObjectResult2(result);
}

async function updateFacts({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/facts/${idParams.factsId}/`;
  const bodyMap = {
    ...body
  }
  if (body.characters) {
    bodyMap.characters = body.characters.map(x => x.id)
  }
  const result = await patch(url, bodyMap);
  return mapObjectResult2(result);
}

async function removeFacts({ matterId, depositionId, factsId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/facts/${factsId}/`;
  const result = await remove(url);
  return result;
}

async function updateFactDetail(payload) {
  const bodyMap = {
    ...payload.item,
    characters: payload.item.characters.map(x => x.id),
  }
  let result = await put(`/api/matters/${payload.matterId}/depositions/${payload.depositionId}/facts/${payload.pk}/`, bodyMap);
  return mapObjectResult2(result);
}
async function getFactDetail(data) {
  const result = await get(`/api/matters/${data.matterId}/depositions/${data.depositionId}/facts/${data.factId}/`)
  return {
    ...result,
    subjects: result.subjects.map(s => s.pk),
    characters: result.characters.map(x => {
      return {
        id: x.character.pk,
        name: `${x.character.last_name} ${x.character.first_name}`,
        avatarUrl: x.character.avatar
      }
    }),
    legal_issues: result.legal_issues.map(i => i.pk),
    sources: result.sources.map(i => i.pk),
    tags: result.tags.map(i => i.pk),
  }

}

export default {
  getDataFacts,
  addFacts,
  updateFacts,
  removeFacts,
  getFactDetail,
  updateFactDetail,
};
