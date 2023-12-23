import { sleep } from "./base";
import { labels } from "../mock-data/data-injury-negligence-label";

async function getDataInjuryLabelNegligence() {
  await sleep();
  return labels;
}
async function addLabelInjurys(data) {
  await sleep();
  return data;
}

async function updateLabelInjurys(data) {
  await sleep();
  return data;
}

async function choseLableInjury(data) {
  await sleep();
  return data;
}

async function removeLabelInjurys(data) {
  await sleep();
  return data;
}

export default {
  getDataInjuryLabelNegligence,
  addLabelInjurys,
  updateLabelInjurys,
  choseLableInjury,
  removeLabelInjurys
};
