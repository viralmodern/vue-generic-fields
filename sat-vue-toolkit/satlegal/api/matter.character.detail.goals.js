import { sleep } from "./base";
import {listGoals} from "../mock-data/data-profile-character-detail-goals";

async function getDataListGoals() {
  await sleep();
  return listGoals;
}
export default {
  getDataListGoals
};
