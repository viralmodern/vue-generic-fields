import { sleep } from "./base";
import { detailList } from "../mock-data/data-filing-room";

async function getDataDetailList() {
  await sleep();
  return detailList;
}
export default {
  getDataDetailList
};
