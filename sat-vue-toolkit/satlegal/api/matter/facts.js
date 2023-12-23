import { get, post, patch, remove, put } from "../base";
import {
  formatQuery,
  getFieldNullAble,
  getFieldArrayObjectNullAble,
  getFieldArrayNullAble
} from "../../utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
}

function mapObjectResult(x) {
  if (!x.relations_info) {
    // không thấy api trả về nên hard
    x.relations_info = {
      total_relations: 0,
      total_first_class_relations: 0,
      first_class_relations: []
    }
  }
  return {
    ...x,
    id: x.pk,
    subjects: x.subjects,
    characters: x.characters.map(x => {
      return {
        id: x.character.pk,
        name: `${x.character.last_name} ${x.character.first_name}`,
        avatarUrl: x.character.avatar
      };
    }),
    legal_issues: x.legal_issues,
    location: {
      extra: x.location ? x.location.raw : ""
    },
    bookmarked_pk: x.bookmarked_pk
  };
}

function mapObjectResult2(x) {
  if (!x.relations_info) {
    // không thấy api trả về nên hard
    x.relations_info = {
      total_relations: 0,
      total_first_class_relations: 0,
      first_class_relations: []
    }
  }
  return {
    ...x,
    id: x.pk,
    subjects: x.subjects.map(s => s.pk),
    characters: x.characters.map(x => {
      return {
        id: x.character.pk,
        name: `${x.character.last_name} ${x.character.first_name}`,
        avatarUrl: x.character.avatar
      };
    }),
    legal_issues: x.legal_issues.map(i => i.pk),
    sources: x.sources.map(i => i.pk),
    tags: x.tags.map(i => i.pk),
    location: {
      extra: x.location ? x.location.raw : ""
    }
  };
}

async function getDataFacts({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/facts/`;
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
      const results = mapResult(result[key].results);
      result[key] = {
        pk: +key,
        results,
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

async function addFacts({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/facts/`;
  const bodyMap = {
    ...body,
    characters: getFieldArrayObjectNullAble(body.characters),
    legal_issues: getFieldArrayNullAble(body.legal_issues),
    favorable: getFieldNullAble(body.favorable),
    dispute: getFieldNullAble(body.dispute),
    relevant_level: getFieldNullAble(body.relevant_level),
    value_level: getFieldNullAble(body.value_level),
    important_level: getFieldNullAble(body.important_level)
  };
  const result = await post(url, bodyMap);
  return mapObjectResult2(result);
}

async function updateFacts({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  if (body.characters) {
    bodyMap.characters = body.characters.map(x => x.id);
  }
  const result = await patch(
    `/api/matters/${idParams.matterId}/facts/${idParams.factsId}/`,
    bodyMap
  );
  return mapObjectResult2(result);
}

async function removeFacts({ matterId, factsId }) {
  const result = await remove(`/api/matters/${matterId}/facts/${factsId}/`);
  return result;
}

// fact-versions
async function getFactSlickGridVersion({ matterId, page }) {
  const result = await get(`/api/matters/${matterId}/fact-versions/?page=${page}`);
  result.results.forEach(x => {
    Object.keys(x.characters).forEach(key => {
      if (Object.keys(x.characters[key]).length) {
        const sourceMap = x.characters[key].sources.map(source => source.pk);
        x.characters[key].sources = sourceMap;
      }
    })
    return x;
  })
  return result;
}
async function patchFactSlickGridVersion({ matterId, body, versionId }) {
  return await patch(
    `/api/matters/${matterId}/fact-versions/${versionId}/`,
    body
  );
}
async function postVersion({ matterId, body }) {
  return await post(`/api/matters/${matterId}/fact-versions/`, body);
}
async function deleteVersion({ matterId, versionId }) {
  return await remove(`/api/matters/${matterId}/fact-versions/${versionId}/`);
}

async function patchOpinionFactVersion({
  matterId,
  versionId,
  characterId,
  body
}) {
  return await patch(
    `/api/matters/${matterId}/fact-versions/${versionId}/opinions/${characterId}/`,
    body
  );
}
// fact-versions characters

async function updateFactDetail(payload) {
  const bodyMap = {
    ...payload.item,
    characters: payload.item.characters.map(x => x.id)
  };
  let result = await put(
    `/api/matters/${payload.matterId}/facts/${payload.pk}/`,
    bodyMap
  );
  return mapObjectResult2(result);
}
async function getFactDetail(data) {
  const result = await get(
    `/api/matters/${data.matterId}/facts/${data.factId}/`
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
    tags: result.tags.map(i => i.pk),
    location: {
      extra: result.location ? result.location.raw : ""
    },
  };
}

// relations
async function updateRelationFacts({ idParams, body }) {
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
    `/api/matters/${idParams.matterId}/facts/${idParams.factsId}/relations/`,
    bodyMap
  );
  return result;
}

async function removeRelationFacts(data) {
  return await remove(`/api/matters/${data.matterId}/facts/${data.factsId}/relations/${data.contentTypeId}/${data.objectId}/`)
}

export default {
  getDataFacts,
  addFacts,
  updateFacts,
  removeFacts,
  getFactDetail,
  updateFactDetail,
  //
  getFactSlickGridVersion,
  patchFactSlickGridVersion,
  patchOpinionFactVersion,
  postVersion,
  deleteVersion,
  // relation
  updateRelationFacts,
  removeRelationFacts,
};
