import { sleep } from "./base";
import { dataHighlight } from "../mock-data/matter.references.highlight";

async function getDataHighlight() {
  await sleep();
  return dataHighlight;
}

async function updateHighlight(data) {
  await sleep();
  return data;
}

export default {
  getDataHighlight,
  updateHighlight
};
