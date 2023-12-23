import { sleep } from "./base";
import { dataAgreementDetail } from "../mock-data/matter.partient.profile.detail.agreement.detail";

async function getDataAgreementDetail() {
  await sleep();
  return dataAgreementDetail;
}

async function updateAgreementDetail(data) {
  await sleep();
  return data;
}

export default {
  getDataAgreementDetail,
  updateAgreementDetail
};
