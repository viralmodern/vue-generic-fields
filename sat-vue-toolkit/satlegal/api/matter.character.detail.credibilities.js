import { sleep } from "./base";
import { dataProjectBoard } from "../mock-data/data-profile-character-detail-credibilities";
async function getDataCredibilities() {
  await sleep();
  return dataProjectBoard;
}

export default {
  getDataCredibilities
};
