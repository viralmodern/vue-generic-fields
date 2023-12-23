import { sleep } from "./base";
import { deponentDetail } from "../mock-data/matter.discovery.deposition.detail.deponent"
async function getDataDeponentDetail() {
  await sleep();
  return deponentDetail;
}

export default {
  getDataDeponentDetail
};
