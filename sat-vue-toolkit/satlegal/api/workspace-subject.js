import { sleep } from "./base";
import { subjects } from "../mock-data/data-workspace-subject";

async function getDataSubject() {
  await sleep();
  return subjects;
}
export default {
  getDataSubject
};
