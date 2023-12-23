import { dataDigitalHowey } from "../mock-data/data-digital-howey-checklist";
import { sleep } from "./base";

async function getDataDigitalHowey() {
  await sleep();
  return dataDigitalHowey
}
export default {
  getDataDigitalHowey
}
