import { sleep } from "./base";
import { injuries } from "../mock-data/data-list-injury";

async function getDataInjuryNegligence() {
  await sleep();
  return injuries;
}
async function addInjurys(data) {
  await sleep();
  return data;
}

async function updateInjurys(data) {
  await sleep();
  return data;
}

async function choseInjury(data) {
  await sleep();
  return data;
}

async function removeInjurys(data) {
  await sleep();
  return data;
}

export default {
  getDataInjuryNegligence,
  addInjurys,
  updateInjurys,
  choseInjury,
  removeInjurys
};
