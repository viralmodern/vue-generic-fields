import { get, post, remove, patch } from "./base";

async function getDataService({ matterId, page }) {
  return await get(`/api/matters/${matterId}/services/?page=${page}`);
}
async function editService(data) {
  const result = { [data.column]: data.value, id: data.parentId, matterId: data.matterId };
  const dataMap = {
    name: result.name,
    character: result.character,
    type: result.type,
    status: result.status,
    deadline: result.deadline,
    managers: [result.member]
  };
  const dataFromAPi = await patch(`/api/matters/${data.matterId}/services/${result.id}/`, dataMap);
  return dataFromAPi;
}
async function addService(data) {
  const result = {
    name: data.name,
    character: data.character,
    type: data.type,
    status: data.status,
    deadline: data.deadline,
    managers: [data.member]
  };
  const dataFromAPi = await post(`/api/matters/${data.matterId}/services/`, result);
  return dataFromAPi;
}
async function deleteService(data) {
  await remove(`/api/matters/${data.matterId}/services/${data.id}/`);
}

async function getDataAttachment({ matterId, serviceId, page }) {
  return await get(`/api/matters/${matterId}/services/${serviceId}/attachments/?page=${page}`);
}
async function uploadAttachment(request) {
  return await post(`/api/matters/${request.matterId}/services/${request.serviceId}/attachments/`, request.formData);
}

async function removeAttachment({ matterId, serviceId, attachmentId }) {
  return await remove(`/api/matters/${matterId}/services/${serviceId}/attachments/${attachmentId}`);
}

export default {
  getDataService,
  editService,
  addService,
  deleteService,

  getDataAttachment,
  uploadAttachment,
  removeAttachment
};