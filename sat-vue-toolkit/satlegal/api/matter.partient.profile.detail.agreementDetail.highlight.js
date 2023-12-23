import { sleep } from "./base";
import { dataHighlight } from "../mock-data/matter.partient.profile.detail.agreementDetail.highlight";

async function getDataHighlight() {
  await sleep();
  return dataHighlight;
}

async function addHighlight(data) {
  await sleep();
  data.citations = [];
  data.facts = [];
  return data;
}

async function updateHighlight(data) {
  await sleep();
  return data;
}

async function removeHighlight(id) {
  await sleep();
  return id;
}

export default {
  getDataHighlight,
  addHighlight,
  updateHighlight,
  removeHighlight
};
