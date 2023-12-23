import { get, post, patch, remove, put } from "../base";
import { formatQuery, getFieldNullAble, getFieldArrayNullAble, getFormData2 } from '../../utils';

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
    flag: x.flag,
    bookmark: x.is_bookmark,
    first_name: x.first_name,
    last_name: x.last_name,
    email: "phanquyenvuong@gmail.com",
    emails: x.emails,
    phone: x.phone,
    location: x.location,
    character_types: x.character_types,
    disclosed_by: x.disclosed_by,
    credibility: x.credibility,
    position: x.position,
    located: x.located,
    availability: x.availability,
    served: x.served,
    legal_issues: x.legal_issues,
    birthday: x.birthday,
    age: x.age,
    background: x.background,
    important: x.important,
    relevant: x.relevant,
    value_level: x.value_level,
    relevant_level: x.relevant_level,
    tags: x.tags,
    members: x.members, // doi
    avatar: x.avatar,
    bookmarked_pk: x.bookmarked_pk,
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
    legal_issues: x.legal_issues.map(i => i.pk),
    tags: x.tags.map(i => i.pk),
    members: x.members.map(i => i.pk)
  };
}

function mapDataGetNotes(data) {
  return {
    id: data.pk,
    title: data.title,
    content: data.text,
    creator: data.creator,
    createdAt: data.created
  };
}

function mapDataAddUpdateNotes(data) {
  return {
    title: data.name,
    text: data.content
  };
}

async function getDataCharacter({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/characters/`;
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

async function getAllDataCharacter({ matterId }) {
  const result = await get(`/api/matters/${matterId}/partial-info-characters/`);
  return result;
}

async function getDataNotesCharacter({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/characters/${idParams.characterId}/notes/`;
  const options = {
    params: query
  };
  const result = await get(url, options);
  const data = result.results.map(x => mapDataGetNotes(x));
  return {
    results: data,
    count: result.count
  };
}

async function addCharacter({ idParams, body }) {
  const tags = getFieldArrayNullAble(body.tags);
  const members = getFieldArrayNullAble(body.members);
  const bodyMap = {
    ...body,
    favorable: getFieldNullAble(body.favorable),
    credibility: getFieldNullAble(body.credibility),
    located: getFieldNullAble(body.located),
    availability: getFieldNullAble(body.availability),
    served: getFieldNullAble(body.served),
    relevant_level: getFieldNullAble(body.relevant_level),
    value_level: getFieldNullAble(body.value_level),
    tags: (tags || []).length > 0 ? tags : undefined,
    members: (members || []).length > 0 ? members : undefined
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/characters/`,
    bodyMap
  );
  return mapObjectResult2(result);
}

async function addNotesCharacter({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/characters/${idParams.characterId}/notes/`;
  const result = await post(url, bodyMap);
  return result;
}

async function updateCharacter({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/characters/${idParams.characterId}/`,
    bodyMap.avatar ? getFormData2(bodyMap) : bodyMap
  );
  return mapObjectResult2(result);
}

async function updateNotesCharacter({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/characters/${idParams.characterId}/notes/${idParams.noteId}/`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeNotesCharacter(data) {
  const url = `/api/matters/${data.matterId}/characters/${data.characterId}/notes/${data.noteId}/`;
  const result = await remove(url);
  return result;
}


async function removeCharacter({ matterId, characterId }) {
  const result = await remove(
    `/api/matters/${matterId}/characters/${characterId}/`
  );
  return result;
}

async function getCharacterDetail(payload) {
  return await get(`/api/matters/${payload.matterId}/characters/${payload.characterId}/`)
}
async function updateCharacterDetail(payload) {
  const bodyMap = {
    ...payload.item
  };

  let result = await put(
    `/api/matters/${payload.matterId}/characters/${payload.pk}/`,
    getFormData2(bodyMap)
  );
  return result;
}

async function getHistoriesCharacters(payload) {
  return await get(`/api/matters/${payload.matterId}/characters/${payload.characterId}/histories/?page=${payload.page}`);
}
async function postHistoriesCharacters(payload) {
  return await post(`/api/matters/${payload.matterId}/characters/${payload.characterId}/histories/`, payload.body);
}
async function patchHistoriesCharacters(payload) {
  return await patch(`/api/matters/${payload.matterId}/characters/${payload.characterId}/histories/${payload.historiesId}/`, payload.body);
}
async function deleteHistoriesCharacters(payload) {
  return await remove(`/api/matters/${payload.matterId}/characters/${payload.characterId}/histories/${payload.historiesId}/`);
}

// comments
async function getDataCommentHistory({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/characters/${idParams.characterId}/histories/${idParams.historyId}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentHistory({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/characters/${idParams.characterId}/histories/${idParams.historyId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentHistory({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/characters/${idParams.characterId}/histories/${idParams.historyId}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentHistory({ matterId, characterId, historyId, commentId }) {
  const url = `/api/matters/${matterId}/characters/${characterId}/histories/${historyId}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}

// relations
async function updateRelationCharacter({ idParams, body }) {
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
    `/api/matters/${idParams.matterId}/characters/${idParams.characterId}/relations/`,
    bodyMap
  );
  return result;
}

async function removeRelationCharacter(data) {
  return await remove(`/api/matters/${data.matterId}/characters/${data.characterId}/relations/${data.contentTypeId}/${data.objectId}/`)
}

export default {
  getDataCharacter,
  getAllDataCharacter,
  getDataNotesCharacter,
  addCharacter,
  addNotesCharacter,
  updateCharacter,
  updateNotesCharacter,
  removeCharacter,
  getCharacterDetail,
  updateCharacterDetail,
  getHistoriesCharacters,
  postHistoriesCharacters,
  patchHistoriesCharacters,
  deleteHistoriesCharacters,

  getDataCommentHistory,
  addCommentHistory,
  updateCommentHistory,
  removeCommentHistory,

  //relations
  updateRelationCharacter,
  removeRelationCharacter,
  removeNotesCharacter
};
