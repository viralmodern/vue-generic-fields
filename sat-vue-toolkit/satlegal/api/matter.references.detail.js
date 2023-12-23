import { sleep } from "./base";
import { dataReferences } from "../mock-data/matter.references.detail";

async function getDataReferencesDetail() {
  await sleep();

  return dataReferences;
}

async function updateReferences(data) {
  await sleep();
  return data;
}

export default {
  getDataReferencesDetail,
  updateReferences
};
