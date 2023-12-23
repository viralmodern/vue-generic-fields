import { sleep } from "./base";
import { labels } from "../mock-data/data-injury-negligence-label";

async function getDataDamageLabelNegligence() {
  await sleep();
  return labels;
}
async function addLabelDamages(data) {
  await sleep();
  return data;
}

async function updateLabelDamages(data) {
  await sleep();
  return data;
}

async function choseLableDamage(data) {
  await sleep();
  return data;
}

async function removeLabelDamages(data) {
  await sleep();
  return data;
}

export default {
  getDataDamageLabelNegligence,
  addLabelDamages,
  updateLabelDamages,
  choseLableDamage,
  removeLabelDamages
};
