import { sleep } from "./base";
import data from "../mock-data/project.list";

async function getProjects() {
  await sleep();
  return data.projects;
}
export default {
  getProjects
};
