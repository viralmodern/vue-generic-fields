import { sleep } from "./base";
import { dataLabels } from "../mock-data/data-goal-label";

async function listGoalLabel() {
  await sleep();
  return dataLabels;
}
export default {
  listGoalLabel
};
