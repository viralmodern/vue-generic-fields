import { sleep } from "./base";
import { damages } from "../mock-data/data-damage-negligence";

async function getDataDamageNegligence() {
  await sleep();
  return damages;
}
async function addDamages(data) {
  await sleep();
  return data;
}

async function updateDamages(data) {
  await sleep();
  return data;
}

async function choseDamage(data) {
  await sleep();
  return data;
}

async function removeDamages(data) {
  await sleep();
  return data;
}

export default {
  getDataDamageNegligence,
  addDamages,
  updateDamages,
  choseDamage,
  removeDamages
};
