import { post, get, patch, remove, put } from "../base";
import { formatQuery } from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(m => {
    return {
      ...m,
      tags: m.tags.map(x => x.pk),
      legal_issues: m.legal_issues.map(x => x.pk),
      provided_by_character: (m.provided_by_character && m.provided_by_character.pk) || null,
      relations_info: m.relations_info
        ? m.relations_info
        : {
          total_relations: 0,
          first_class_relations: []
        }
    };
  });
}
// evidences slick grid
async function getEvidencesFromApi({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/evidences/`;
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

async function postEvidences(payload) {
  return await post(
    `/api/matters/${payload.matterId}/evidences/`,
    payload.body
  );
}

async function patchEvidences({ idParams, body }) {
  return await patch(
    `/api/matters/${idParams.matterId}/evidences/${idParams.evidencesId}/`,
    body
  );
}
async function updateReport({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/evidences/${idParams.rowId}/reports/`;
  let result = {}
  if (body) {
    result = await remove(`${url}${body.pk}/`)
  }
  else {
    result = await post(url, { reason: 's' })
  }
  return result
}
async function removeEvidences(payload) {
  return await remove(
    `/api/matters/${payload.matterId}/evidences/${payload.evidencesId}/`
  );
}
// Chain of Custody Slick grid
async function getDataChainCustodyFromApi() {
  return {
    count: data.length,
    results: data
  };
}

async function postChainCustody(payload) {
  return await { ...data[0], ...payload.body };
}

async function patchChainCustody(payload) {
  return await payload;
}

async function deleteChainCustody(payload) {
  return await payload;
}

async function getEvidencesDetail(data) {  
  const result = await get(
    `/api/matters/${data.matterId}/evidences/${data.evidencesId}/`
  );
  return {
    ...result,
    tags: result.tags.map(i => i.pk),
    legal_issues: result.legal_issues.map(x => x.pk),
    provided_by_character: (result.provided_by_character && result.provided_by_character.pk) || null,
    relations_info: result.relations_info
      ? result.relations_info
      : {
        total_relations: 0,
        first_class_relations: []
      }
  };
}

async function updateEvidencesDetail(payload) {
  let result = await put(
    `/api/matters/${payload.matterId}/evidences/${payload.pk}/`,
    payload.item
  );
  return result;
}

// relations
async function updateRelationEvidence({ idParams, body }) {
  const bodyMap = {
    relations: [
      {
        content_type_id: body.content_type_id,
        object_id: body.pk.toString(),
        name: body.name
      }
    ]
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/evidences/${idParams.evidencesId}/relations/`,
    bodyMap
  );
  return result;
}

async function removeRelationEvidence(data) {
  return await remove(
    `/api/matters/${data.matterId}/evidences/${data.evidencesId}/relations/${data.contentTypeId}/${data.objectId}/`
  );
}

// comments
async function getComments({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/evidences/${idParams.evidencesId}/${idParams.parentId}/comments/`;
  const options = {
    params: query
  };
  const result = await get(url, options);
  return {
    results: result.results,
    count: result.count
  };
}

async function addComments({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/evidences/${idParams.evidencesId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return result;
}

async function removeComments({ matterId, evidencesId, commentId }) {
  return await remove(
    `/api/matters/${matterId}/evidences/${evidencesId}/comments/${commentId}/`
  );
}

async function patchComments({ idParams, body }) {
  return await patch(
    `/api/matters/${idParams.matterId}/evidences/${idParams.evidencesId}/comments/${idParams.commentId}/`,
    body
  );
}

export default {
  getEvidencesFromApi,
  postEvidences,
  patchEvidences,
  removeEvidences,
  //
  getDataChainCustodyFromApi,
  postChainCustody,
  deleteChainCustody,
  patchChainCustody,
  getEvidencesDetail,
  updateEvidencesDetail,
  // relasion
  updateRelationEvidence,
  removeRelationEvidence,
  // comments
  getComments,
  addComments,
  removeComments,
  patchComments,
  updateReport
};

const data = [
  {
    pk: 1,
    name: "name",
    evidence_desc: "desc",
    date_submitted: new Date().toISOString(),
    collecte_by: [],
    date_collected: new Date().toISOString(),
    date_and_time_stored: new Date().toISOString(),
    storage_location: "",
    device_type: [],
    md5_sum: "123456 – 5FRWEQW – 31SDFADAS – 123AASDAD",
    sha_1_sum: "33201968 – B3F4A3DB – 82A53CCA – AC5D8C1B",
    comment: [],
    submitter_desc: "submitter desc",
    chain_of_custody: "",
    desc: "desc",
    reliquished_by_character: [],
    reliquished_by_matter_member: [],
    reliquished_date: new Date().toISOString(),
    received_by_character: [],
    received_by_matter_member: [],
    received_date: new Date().toISOString()
  }
];
