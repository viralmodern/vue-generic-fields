import { sleep } from "./base";
import { dataType } from "../mock-data/data-matter-type";

async function getDataTypeMatter() {
  await sleep();
  return dataType;
}
export default {
  getDataTypeMatter
};
