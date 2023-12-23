import { get,} from "../../base";
import {
  formatQuery,
} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  return data.map(x => {
    return {
      ...x,
      id: x.pk,
    };
  });
}


async function getDataFromApi({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/subpoena-productions/`;
  const options = {
    params: formatQuery(searchObject)
  };
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
// attachment
async function getDataAttachment({ idParams, query }) {
  const url = `api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/productions/${idParams.rowId}/attachments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;

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

// notes
async function getNotes({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/subpoenas/${idParams.subpoenaId}/productions/${idParams.rowId}/notes/`;
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

export default {
  getDataFromApi,
  getDataAttachment,
  getNotes,
};
