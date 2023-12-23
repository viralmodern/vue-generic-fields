import { get, post, remove, patch } from "../base";
import {
  formatQuery, getFormData2
} from "../../utils";

async function getDataDocument({ searchObject = {}, pk }) {
  const url = `/api/clients/${pk}/document-requests/`;
  const options = {
    params: formatQuery(searchObject)
  };
  const result = await get(url, options);
  return result
}

async function updateDocument({ idParams, body }) {
  const mapBody = {
    ...body
  }
  const result = await patch(`/api/clients/${idParams.clientId}/document-requests/${idParams.pk}/`, mapBody);
  return result;
}

async function postDocument({ clientId, body }) {
  const result = await post(`/api/clients/${clientId}/document-requests/`, body)
  return result
}

async function removeDocument({ pk, clientId }) {
  const result = await remove(
    `/api/clients/${clientId}/document-requests/${pk}/`
  );
  return result;
}

// comments
async function getDataCommentDocument({ idParams, query = {} }) {
  const url = `/api/clients/${idParams.clientId}/document-requests/${idParams.id}/${idParams.parentId}/comments/`;
  const options = {
    params: query,
  }
  const result = await get(url, options);
  return result;
}

async function addCommentDocument({ idParams, body }) {
  const url = `/api/clients/${idParams.clientId}/document-requests/${idParams.id}/${idParams.parentId}/comments/`;
  const result = await post(url, body);
  return {
    ...result,
    child_count: 0,
  };
}

async function updateCommentDocument({ idParams, body }) {
  const url = `/api/clients/${idParams.clientId}/document-requests/${idParams.id}/comments/${idParams.commentId}/`;
  const result = await patch(url, body);
  return result;
}

async function removeCommentDocument({ clientId, id, commentId }) {
  const url = `/api/clients/${clientId}/document-requests/${id}/comments/${commentId}/`;
  const result = await remove(url);
  return result;
}

// attachment
async function addAttachment({ idParams, body }) {
  const url = `/api/clients/${idParams.clientId}/document-requests/${idParams.requestForProductionId}/attachments/`;
  const result = await post(url, getFormData2(body));
  return result;
}

async function updateAttachment({ idParams, body }) {
  const url = `/api/clients/${idParams.clientId}/document-requests/${idParams.requestForProductionId}/attachments/${idParams.attachmentId}`;
  const result = await patch(url, getFormData2(body));
  return result;
}

async function removeAttachment({ clientId, requestForProductionId, attachmentId }) {
  const url = `/api/clients/${clientId}/document-requests/${requestForProductionId}/attachments/${attachmentId}`;
  const result = await remove(url);
  return result;
}

export default {
  getDataDocument,
  updateDocument,
  removeDocument,
  postDocument,
  getDataCommentDocument,
  addCommentDocument,
  updateCommentDocument,
  removeCommentDocument,
  //attachment
  addAttachment,
  updateAttachment,
  removeAttachment,
};
