import { sleep } from "./base";
import { dataAbout } from "../mock-data/data-profile-character-detail-about";
async function getDataAbout() {
  await sleep();
  return dataAbout;
}

export default {
  getDataAbout
};
