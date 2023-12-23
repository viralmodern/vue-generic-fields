import { sleep } from "./base";
import data from "../mock-data/project-resources";

async function getTeams() {
  await sleep();
  return data.teams;
}
export default {
  getTeams,
};
