import { sleep } from "./base";
import data from "../mock-data/project-resources";

async function getBoards() {
  await sleep();
  return data.boards;
}
export default {
  getBoards,
};
