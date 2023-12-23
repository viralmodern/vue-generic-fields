import { get, post, patch, remove, put } from "../base";
import {
  formatQuery,
} from "@/sat-vue-toolkit/satlegal/utils";
function mapResult(data) {
  return data.map(x => {
    return mapObjectResult(x);
  });
}
function mapObjectResult(x) {
  return {
    ...x,
    id: x.pk,
    entry_number: x.entry_number,
    date_added: x.date_added,
    documents: x.documents,
    filed_by: x.filed_by,
    short_description: x.short_description,
    description: x.description,
    pacer_link: x.pacer_link,
    entry_type: x.entry_type,
    comment_count: 12, //hard
    note_count: 11, //hard
    labels: x.labels,
    attachments: x.attachments, //dang single
    members: x.members,
    flag: x.flag,
    bookmarked_pk: x.bookmarked_pk //hard
  };
}

async function getDataDocket({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/docket-entries/`;
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

async function getDataDocketNoGroup({idParams, searchObject}) {
  const url = `/api/matters/${idParams.matterId}/docket-entries/`;
  const options = {
    params: formatQuery({...searchObject, ungroup: true})
  };
  const result = await get(url, options);
  return result;
}

async function addDocket(data) {
  return data;
}

async function updateDocket({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/docket-entries/${idParams.docketId}/`,
    bodyMap
  );
  return result;
}


async function removeDocket(data) {
  return data
}

// Related
async function getDataDocketRelated() {
  return {
    count: 1,
    results: [
      {
        docket_entry_number: 102,
        docket_desc: "Ronaldo",
        related_fact: [],
        related_evidence: [],
        related_character: [],
        related_request_status: [],
        related_request_item: [],
      }
    ]
  }
}
async function postDocketRelated() {

}
async function patchDocketRelated() {

}
async function deleteDocketRelated() {

}

export default {
  getDataDocket,
  getDataDocketNoGroup,
  addDocket,
  updateDocket,
  removeDocket,
  // Related
  getDataDocketRelated,
  postDocketRelated,
  patchDocketRelated,
  deleteDocketRelated
};
