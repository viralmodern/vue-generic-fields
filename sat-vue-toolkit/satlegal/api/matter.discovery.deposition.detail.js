import { get, patch } from "./base";

async function getDataDepositionDetail({ matterId, depositionId }) {
  const result = await get(`/api/matters/${matterId}/depositions/${depositionId}/`);
  if(!result.relations_info) {
    // không thấy api trả về nên hard
    result.relations_info = {
      total_relations: 0,
      total_first_class_relations: 0,
      first_class_relations: []
    }
  }
  return {
    ...result,
    members: result.members.filter(userId => userId !== result.creator)
  };
}

async function editDataDespositionDetail({ idParams, body }) {
  const result = await patch(`/api/matters/${idParams.matterId}/depositions/${idParams.despositionId}/`, body);
  return {
    ...result,
    members: result.members.filter(userId => userId !== result.creator)
  };
}

export default {
  getDataDepositionDetail,
  editDataDespositionDetail
};
