import { get } from "./base";
// import { members } from "../mock-data/data-workspace-member";

async function getDataMembers() {
  const result = await get("/api/workspace/members/");
  return result;
}
export default {
  getDataMembers
};
