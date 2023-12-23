import { sleep } from "./base";
import { dataLogDetail } from "../mock-data/data-discovery-log-detail";

async function getDataLogDetail(id) {
  // eslint-disable-next-line
  console.log("discoveryLogDetail", id);
  await sleep();
  return dataLogDetail;
}

export default {
  getDataLogDetail
};
