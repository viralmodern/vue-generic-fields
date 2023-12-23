import { get, post, patch, remove } from "../../base";
import { formatQuery, getFieldArrayNullAble } from "@/sat-vue-toolkit/satlegal/utils";

const mapResultGetKeyPleading = data => {
  return data.map(x => {
    return {
      ...x,
      comment_count: x.comment_count || 0,
      note_count: x.note_count || 0,
    }
  })
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

async function getDataKeyPleading({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/`;
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
      const results = mapResultGetKeyPleading(result[key].results);
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
      results: mapResultGetKeyPleading(result.results),
      totals: result.count,
      next: result.next
    }
  };
}

async function getKeyPleadingDetail(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/${idParams.keyPleadingId}/`;
  const result = await get(url)
  return result
}

async function addKeyPleading({ idParams, body }) {
  const bodyMap = {
    pleading: body.pleading,
    counterclaim: body.counter_claim,
    goals: getFieldArrayNullAble(body.goals)
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/`,
    bodyMap
  );
  return {
    ...result,
    pleading: result.pleading,
    counter_claim: result.counterclaim,
    goals: result.goals.map(x => x.pk)
  };
}

async function updateKeyPleading({ idParams, body }) {
  const bodyMap = {
    pleading: body.pleading,
    counterclaim: body.counterclaim,
    goals: body.goals
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/${idParams.keyPleadingId}/`,
    bodyMap
  );
  return result;
}

async function removeKeyPleading({ matterId, depositionId, keyPleadingId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/key-pleadings/${keyPleadingId}/`
  );
  return result;
}

// notes
async function getDataNotesKeyPleading({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/${idParams.keyPleadingId}/notes/`;
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

async function addNotesKeyPleading({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/${idParams.keyPleadingId}/notes/`;
  const result = await post(url, bodyMap);
  return result;
}

async function updateNotesKeyPleading({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/${idParams.keyPleadingId}/notes/${idParams.noteId}/`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeNotesKeyPleading({
  matterId,
  depositionId,
  keyPleadingId,
  noteId
}) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/key-pleadings/${keyPleadingId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}

// comments
async function getDataCommentKeyPleading({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/${idParams.keyPleadingId}/${idParams.parentId}/comments/`;
  const options =  {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentKeyPleading({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/${idParams.keyPleadingId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentKeyPleading({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/${idParams.keyPleadingId}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentKeyPleading({ matterId, depositionId, keyPleadingId, commentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/key-pleadings/${keyPleadingId}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}


// bookmark
async function addBookmarkKeyPleading({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/${idParams.keyPleadingId}/bookmarks/`;
  const result = await post(url);
  return result;
}

async function removeBookmarkKeyPleading({ idParams }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/${idParams.keyPleadingId}/bookmarks/`;
  const result = await remove(url);
  return result;
}


export default {
  getDataKeyPleading,
  addKeyPleading,
  updateKeyPleading,
  removeKeyPleading,
  getKeyPleadingDetail,
  // notes
  getDataNotesKeyPleading,
  addNotesKeyPleading,
  updateNotesKeyPleading,
  removeNotesKeyPleading,
  // comments
  getDataCommentKeyPleading,
  addCommentKeyPleading,
  updateCommentKeyPleading,
  removeCommentKeyPleading,
  // bookmark
  addBookmarkKeyPleading,
  removeBookmarkKeyPleading,
};
