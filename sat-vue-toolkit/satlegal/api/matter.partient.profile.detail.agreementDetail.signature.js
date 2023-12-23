import { sleep } from "./base";
import { dataSignature } from "../mock-data/matter.partient.profile.detail.agreementDetail.signature";

async function getDataSignature() {
  await sleep();
  return dataSignature;
}

async function updateSignature(data) {
  await sleep();
  return data;
}

export default {
  getDataSignature,
  updateSignature
};
