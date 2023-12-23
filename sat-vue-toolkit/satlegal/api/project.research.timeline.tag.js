import { sleep } from "./base";
import { tags } from "../mock-data/project.research.timeline.tag";

async function getDataTags() {
  await sleep();
  return tags;
}
export default {
  getDataTags
};
