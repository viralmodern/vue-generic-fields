import { sleep } from "./base";
import { dataListType } from "../mock-data/data-discovery-log-detail-list-type";

async function getDataListType() {
  await sleep();
  return dataListType;
}

export default {
  getDataListType
};
