import { get, post, patch, remove } from "./base";
// import { listRelationship } from "../mock-data/data-relationship"

async function getDataRelationship(matterId) {
  const result = await get(`/api/matters/${matterId}/character-relationships/`)
  return result;
}

async function addDataRelationship(data) {
  const dataMap = {
    from_character: data.from_id,
    to_character: data.to_id,
    relationship_type: data.value
  }
  const result = await post(`/api/matters/${data.matterId}/character-relationships/`, dataMap)
  return result;
}

async function updateDataRelationship(data) {
  const dataMap = {
    relationship_type: data.value
  }
  const result = await patch(`/api/matters/${data.matterId}/character-relationships/${data.id}/`, dataMap)
  return result;
}

async function removeDataRelationship(data) {
  const result = await remove(`/api/matters/${data.matterId}/character-relationships/${data.id}/`)
  return result;
}

export default {
  getDataRelationship,
  addDataRelationship,
  updateDataRelationship,
  removeDataRelationship
};
