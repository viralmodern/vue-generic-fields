import { sleep } from "./base";
import { listPolicyLifecycle } from "../mock-data/data-filing-room";

async function getDataPolicyLifecycle() {
  await sleep();
  return listPolicyLifecycle;
}

export default {
  getDataPolicyLifecycle
};
