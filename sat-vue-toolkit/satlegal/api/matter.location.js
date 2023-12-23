import { sleep } from "./base";
import {listLocations} from '../mock-data/data-master-location'
async function listLocation() {
  await sleep();
  return listLocations
}

export default {
  listLocation
};
