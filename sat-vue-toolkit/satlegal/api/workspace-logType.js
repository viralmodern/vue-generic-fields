import { sleep } from "./base";
import { dataLogType } from "../mock-data/data-log-type";

async function getDataLogType() {
  await sleep();
  return dataLogType;
}
export default {
  getDataLogType
};
