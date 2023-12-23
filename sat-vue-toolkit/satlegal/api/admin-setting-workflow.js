import { sleep } from "./base";
import {dataWorkflow} from "../mock-data/data-setting-worklfow";

async function listWorkflow() {
  await sleep();
  return dataWorkflow;
}
export default {
  listWorkflow,
};
