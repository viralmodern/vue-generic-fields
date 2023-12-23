import { get, post, remove, patch } from "../base";
import { formatQuery } from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
}

function mapObjectResult(x) {
  const getValueCusotdy = (custody, key) => custody ? custody[key] : null
  let custodyItems = getValueCusotdy(x.custody, "chain_custody_items") || [];
  if (custodyItems.length) {
    custodyItems = custodyItems.map(x2 => {
      if (x2.relinquish_characters) {
        x2.relinquish_characters = x2.relinquish_characters.map(c => ({ ...c, name: c.first_name + " " + c.last_name }));
      }
      if (x2.receive_characters) {
        x2.receive_characters = x2.receive_characters.map(c => ({ ...c, name: c.first_name + " " + c.last_name }));
      }
      return x2;
    });
  }
  const custody = {
    evidence: getValueCusotdy(x.custody, "evidence"),
    date_submit: getValueCusotdy(x.custody, "date_submit"),
    collected_by: getValueCusotdy(x.custody, "collected_by"),
    date_collected: getValueCusotdy(x.custody, "date_collected"),
    date_time_stored: getValueCusotdy(x.custody, "date_time_stored"),
    location: getValueCusotdy(x.custody, "location"),
    device_types: getValueCusotdy(x.custody, "device_types") || [],
    md5: getValueCusotdy(x.custody, "md5"),
    sha: getValueCusotdy(x.custody, "sha"),
    submitter_desc: getValueCusotdy(x.custody, "submitter_desc"),
    chain_custody_items: custodyItems,
  }
  return {
    ...x,
    pk: x.pk,
    name: x.name,
    desc: x.desc,
    total_comments: x.total_comments || 0,
    ...custody,
  };
}

async function getDataEvidencesCustody({ idParams, searchObject }) {
  const url = `/api/matters/${idParams.matterId}/evidences/`;
  const searchObjectMap = { ...searchObject, ungroup: true }
  const options = {
    params: formatQuery(searchObjectMap)
  };
  const result = await get(url, options);
  const results = mapResult(result.results);
  return {
    results,
    count: result.count
  };
}

async function addDataEvidencesCustody({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/evidences/`;
  const result = await post(url, body);
  return mapObjectResult(result);
}

async function updateDataEvidencesCustody({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/evidences/${idParams.evidenceId}/`;
  const result = await patch(url, body);
  return mapObjectResult(result);
}

async function removeEvidencesCustody({ matterId, evidenceId }) {
  const result = await remove(
    `/api/matters/${matterId}/evidences/${evidenceId}/`
  );
  return result;
}

// custody

async function addDataCustodyInEvidence({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/evidences/${idParams.evidenceId}/custody/`;
  const result = await post(url, body);
  return result;
}

async function updateDataCustodyInEvidence({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/evidences/${idParams.evidenceId}/custody/`;
  const result = await patch(url, body);
  return result;
}

// custody item

async function addDataCustodyItemInEvidence({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/evidences/${idParams.evidenceId}/custody/items/`;
  const result = await post(url, body);
  return result;
}

async function updateDataCustodyItemInEvidence({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  if (bodyMap.relinquish_characters) {
    bodyMap.relinquish_characters = bodyMap.relinquish_characters.map(x => x.pk)
  }
  if (bodyMap.receive_characters) {
    bodyMap.receive_characters = bodyMap.receive_characters.map(x => x.pk)
  }
  const url = `/api/matters/${idParams.matterId}/evidences/${idParams.evidenceId}/custody/items/${idParams.custodyItemId}`;
  const result = await patch(url, bodyMap);
  return result;
}

async function removeDataCustodyItemInEvidence(data) {
  const url = `/api/matters/${data.matterId}/evidences/${data.evidenceId}/custody/items/${data.custodyItemId}`;
  const result = await remove(url);
  return result;
}

// comments
async function getDataCommentEvidencesCustody({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/evidences/${idParams.evidenceId}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentEvidencesCustody({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/evidences/${idParams.evidenceId}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentEvidencesCustody({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/evidences/${idParams.evidenceId}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentEvidencesCustody(data) {
  const url = `/api/matters/${data.matterId}/evidences/${data.evidenceId}/comments/${data.commentId}/`;
  const result = await remove(url);
  return result;
}

export default {
  getDataEvidencesCustody,
  addDataEvidencesCustody,
  updateDataEvidencesCustody,
  removeEvidencesCustody,
  // custody
  addDataCustodyInEvidence,
  updateDataCustodyInEvidence,
  // custody item
  addDataCustodyItemInEvidence,
  updateDataCustodyItemInEvidence,
  removeDataCustodyItemInEvidence,
  // comments
  getDataCommentEvidencesCustody,
  addCommentEvidencesCustody,
  updateCommentEvidencesCustody,
  removeCommentEvidencesCustody,
};
