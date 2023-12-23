import { get, remove, post } from "./base";

async function getAttachmentsRequestTask() {
  return await get(`/api/matters/19/request-sets/6/tasks/5/attachments/`);
}

async function addAttachmentRequest(params) {
  return await post(`/api/matters/19/request-sets/6/tasks/5/attachments/`, params.formData);
}

async function removeAttachmentRequest(params) {
  return await remove(`/api/matters/19/request-sets/6/tasks/5/attachments/${params.id}/`)
}

export default {
  getAttachmentsRequestTask,
  addAttachmentRequest,
  removeAttachmentRequest
}
