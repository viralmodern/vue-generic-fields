import { get, post, patch, remove } from "./base";
import { formatQuery } from '../utils';
// import { dataRFP } from "../mock-data/matter.discovery.deposition.preparation.requestForProduction";

function mapResult(data) {
  return data.map(x => {
    return {
      ...x,
      id: x.pk,
      sources: x.sources.map(source => source.pk),
      docs_characters: x.docs_characters.map(
        docs_characters => docs_characters.pk
      )
    }
  })
}

async function getDataRFP({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/`;
  const options = {
    params: formatQuery(searchObject)
  }
  const group = {};
  Array.isArray(searchObject.group_items) && searchObject.group_items.forEach(key => {
    group[key] = {
      pk: +key,
      list: [],
      totals: 0,
    }
  });
  const result = await get(url, options);
  if (!searchObject.ungroup) {
    for (let key in result) {
      const list = mapResult(result[key].results);
      result[key] = {
        pk: +key,
        list,
        totals: result[key].count || 0
      }
    }
    return {...group, ...result};
  }
  return {
    all: {
      pk: 'all',
      list: mapResult(result.results),
      totals: result.count,
    }
  }
}

async function getDataAttachmentRFP({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.RFPId}/attachments`;
  const options =  {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function getDataNotesRFP({ idParams, query = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.noteId}/notes`;
  const options =  {
    params: query,
  }
  const result = await get(url, options);
  const data = result.results.map(x => ({
    id: x.pk,
    title: x.title,
    content: x.text,
    creator: x.creator,
    createdAt: x.created,
  }))
  return {
    results: data,
    count: result.count,
  };
}

async function addRFP({ idParams, body }) {
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/`,
    body
  );
  return {
    ...result,
    id: result.pk,
    sources: result.sources.map(source => source.pk),
    docs_characters: result.docs_characters.map(
      docs_characters => docs_characters.pk
    )
  };
}

async function addAttachmentRFP({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.RFPId}/attachments/`;
  const result = await post(url, body);
  return result;
}

async function addNotesRFP({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.RFPId}/notes/`;
  const result = await post(url, body);
  return result;
}

async function updateRFP({ idParams, body }) {
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.RFPId}/`,
    body
  );
  return result;
}

async function updateAttachmentRFP({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.RFPId}/attachments/`;
  const result = await patch(url, body);
  return result;
}

async function updateNotesRFP({ idParams, body }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/requestforproddocs/${idParams.RFPId}/notes/${idParams.noteId}`;
  const result = await patch(url, body);
  return result;
}

async function removeRFP({ matterId, depositionId, RFPId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/requestforproddocs/${RFPId}/`
  );
  return result;
}

async function removeAttachmentRFP({ matterId, depositionId, RFPId, attachmentId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/requestforproddocs/${RFPId}/attachments/${attachmentId}`;
  const result = await remove(url);
  return result;
}

async function removeNotesRFP({ matterId, depositionId, RFPId, noteId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/requestforproddocs/${RFPId}/notes/${noteId}`;
  const result = await remove(url);
  return result;
}

export default {
  getDataRFP,
  getDataAttachmentRFP,
  getDataNotesRFP,
  addRFP,
  addAttachmentRFP,
  addNotesRFP,
  updateRFP,
  updateAttachmentRFP,
  updateNotesRFP,
  removeRFP,
  removeAttachmentRFP,
  removeNotesRFP,
};
