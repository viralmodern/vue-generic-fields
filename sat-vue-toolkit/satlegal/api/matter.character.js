import { get, patch, post, remove } from "./base";
// import { listCharacter } from "../mock-data/data-character";

async function getDataCharacter({matterId = 10}) {
  const options = {
    params: {
      ungroup: true
    }
  }
  const result = await get(`/api/matters/${matterId}/characters/`, options);
  return result.results;
}

async function addDataCharacter({ matterId, data }) {
  const dataMap = {
    character_types: [data.type],
    phone: [data.phone],
    emails: [data.email],
    first_name: data.first_name,
    last_name: data.last_name
  };
  const result = await post(`/api/matters/${matterId}/characters/`, dataMap);
  return result;
}

async function updateDataCharacter({ matterId, data }) {
  const dataMap = {
    character_types: data.type ? [data.type] : undefined,
    phone: data.phone ? [data.phone] : undefined,
    emails: data.email ? [data.email] : undefined,
    first_name: data.first_name,
    last_name: data.last_name
  };
  // con cai name chua sua
  const result = await patch(
    `/api/matters/${matterId}/characters/${data.id}/`,
    dataMap
  );
  return result;
}

async function deleteDataCharacter({ matterId, id }) {
  const result = await remove(`/api/matters/${matterId}/characters/${id}/`);
  return result;
}

export default {
  getDataCharacter,
  addDataCharacter,
  updateDataCharacter,
  deleteDataCharacter
};
