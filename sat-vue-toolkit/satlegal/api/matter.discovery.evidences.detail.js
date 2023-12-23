import { sleep } from "./base";
import { dataEvidencesDetail } from "../mock-data/matter.discovery.evidences.detail";

async function getDataEvidencesDetail(id) {
  await sleep();
  const number = id % 3;
  switch (number) {
    case 0:
      dataEvidencesDetail.type = "evidences";
      break;
    case 1:
      dataEvidencesDetail.type = "hearsay";
      break;
    case 2:
      dataEvidencesDetail.type = "testimony";
      break;
    default:
      dataEvidencesDetail.type = "evidences";
      break;
  }
  return dataEvidencesDetail;
}

async function updateEvidences(data) {
  await sleep();
  return data;
}

export default {
  getDataEvidencesDetail,
  updateEvidences
};
