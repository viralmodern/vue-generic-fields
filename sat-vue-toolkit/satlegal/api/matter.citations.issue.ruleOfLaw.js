import { sleep } from "./base";
import { dataRuleOfLaw } from "../mock-data/matter.citations.issue.ruleOfLaw";

async function getDataRuleOfLaw() {
  await sleep();
  return dataRuleOfLaw;
}

async function addRuleOfLaw(data) {
  await sleep();
  return data;
}

async function updateRuleOfLaw(data) {
  await sleep();
  return data;
}

async function choseTag(data) {
  await sleep();
  return data;
}

async function removeRuleOfLaw(data) {
  await sleep();
  return data;
}

export default {
  getDataRuleOfLaw,
  addRuleOfLaw,
  updateRuleOfLaw,
  choseTag,
  removeRuleOfLaw
};
