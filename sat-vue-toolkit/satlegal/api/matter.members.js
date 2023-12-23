import { sleep } from "./base";
import { dataMatterMembers } from "../mock-data/matter.members";

async function getDataMatterMembers() {
  await sleep();
  return dataMatterMembers;
}

export default {
  getDataMatterMembers,
};
