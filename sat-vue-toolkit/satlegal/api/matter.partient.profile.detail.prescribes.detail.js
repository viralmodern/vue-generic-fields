import { sleep } from "./base";
import { dataPrescribesDetail } from "../mock-data/matter.partient.profile.detail.prescribes.detail";

async function getDataPrescribesDetail() {
  await sleep();
  return dataPrescribesDetail;
}

async function updatePrescribesDetail(data) {
  await sleep();
  return data;
}

export default {
  getDataPrescribesDetail,
  updatePrescribesDetail
};
