import { sleep } from "./base";
import { favorables } from "../mock-data/data-workspace-favorable";

async function getDataFavorable() {
  await sleep();
  return favorables;
}
export default {
  getDataFavorable
};
