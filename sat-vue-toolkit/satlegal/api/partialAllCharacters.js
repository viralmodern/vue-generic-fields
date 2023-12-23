import { get } from "./base";

async function getAllCharacter(matterId) {
  return await get(`/api/matters/${matterId}/partial-info-characters/`);
}

export default {
  getAllCharacter
};
