import { get, post, patch, remove } from "../../base";
import { formatQuery, getFormData2 } from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  })
}

function mapObjectResult(x) {
  return {
    ...x
  }
}


function mapDataAddUpdateNotes(data) {
  return {
    title: data.name,
    text: data.content
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

async function getDataPriorEmployment({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/`;
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

async function getDataPriorEmploymentDetail(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/${idParams.priorEmploymentId}/`;
  const result = await get(url);
  return result
}

async function addPriorEmployment({ idParams, body }) {
  const bodyMap = getFormData2(body, [null, undefined]);
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/`,
    bodyMap
  );
  return mapObjectResult(result);
}

async function updatePriorEmployment({ idParams, body }) {
  const bodyMap = getFormData2(body);
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/${idParams.priorEmploymentId}/`,
    bodyMap
  );
  return mapObjectResult(result);
}

async function removePriorEmployment({ matterId, depositionId, priorEmploymentId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/prior-employments/${priorEmploymentId}/`,
  );
  return result;
}
// notes
async function getDataNotesPriorEmployment({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/${idParams.priorEmploymentId}/notes/`;
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

async function addNotesPriorEmployment({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/${idParams.priorEmploymentId}/notes/`;
  const result = await post(url, bodyMap);
  return result;
}

async function updateNotesPriorEmployment({ idParams, body }) {
  const bodyMap = mapDataAddUpdateNotes(body);
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/${idParams.priorEmploymentId}/notes/${idParams.noteId}/`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeNotesPriorEmployment({
  matterId,
  depositionId,
  priorEmploymentId,
  noteId
}) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/prior-employments/${priorEmploymentId}/notes/${noteId}/`;
  const result = await remove(url);
  return result;
}

// comments
async function getDataCommentPriorEmployment({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/${idParams.priorEmploymentId}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentPriorEmployment({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/${idParams.priorEmploymentId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentPriorEmployment({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/prior-employments/${idParams.priorEmploymentId}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentPriorEmployment({ matterId, depositionId, priorEmploymentId, commentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/prior-employments/${priorEmploymentId}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}



export default {
  getDataPriorEmployment,
  addPriorEmployment,
  updatePriorEmployment,
  removePriorEmployment,
  // notes
  getDataNotesPriorEmployment,
  addNotesPriorEmployment,
  updateNotesPriorEmployment,
  removeNotesPriorEmployment,
  // comments
  getDataCommentPriorEmployment,
  addCommentPriorEmployment,
  updateCommentPriorEmployment,
  removeCommentPriorEmployment,
  //Detail
  getDataPriorEmploymentDetail
};
