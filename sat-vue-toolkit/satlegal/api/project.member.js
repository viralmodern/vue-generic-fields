import { get } from "./base";

async function getMembers({matterId}) {
  const result = await get(`/api/projects/${matterId}/members/`)
  return result;
}
export default {
  getMembers
};
