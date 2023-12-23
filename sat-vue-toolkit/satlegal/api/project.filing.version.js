import { sleep } from "./base";
import { versions } from "../mock-data/filing-room-version";

async function getDataVersion() {
  await sleep();
  return versions;
}
export default {
  getDataVersion
};
