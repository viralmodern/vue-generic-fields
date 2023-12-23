import { get, post, remove, patch } from "../base";


async function getWorkSpaceMembers(params) {
  const results = await get('api/workspace/members/', params);
  return results;
}
async function getClients(params) {
  const results = await get('/api/clients/?ungroup=true', params);
  return results.results.map(item => ({ ...item, id: item.pk }));
}

async function labelsWorkSpace(params) {
  const result = await get('api/client-labels/', params);
  return result.results || [];
}

async function addLableWorkSpace(body) {
  const mapBody = { ...body, color: body.color.replace("#", "") }
  const results = await post('api/client-labels/', mapBody);
  return results;
}

async function updateLableWorkSpace(body) {
  const result = await patch(`api/client-labels/${body.id}/`, body);
  return result;
}

async function removeLableWorkSpace(id) {
  const result = await remove(`api/client-labels/${id}/`);
  return result;
}
export default {
  getWorkSpaceMembers,
  labelsWorkSpace,
  addLableWorkSpace,
  removeLableWorkSpace,
  updateLableWorkSpace,
  getClients
};
