import { get, remove, post } from "./base";

async function getAttachmentsRequestSets(paramsRequest) {
  return await get(`/api/matters/${paramsRequest.matterId}/request-sets/${paramsRequest.rowId}/attachments/`);
}

async function addAttachmentRequest(bodyRequest) {
  return await post(`/api/matters/${bodyRequest.matterId}/request-sets/${bodyRequest.rowId}/attachments/`, bodyRequest.formData);
}

async function removeAttachmentRequest(params) {
  return await remove(`/api/matters/${params.matterId}/request-sets/${params.request_set}/attachments/${params.id}/`)
}

export default {
  getAttachmentsRequestSets,
  addAttachmentRequest,
  removeAttachmentRequest
}
