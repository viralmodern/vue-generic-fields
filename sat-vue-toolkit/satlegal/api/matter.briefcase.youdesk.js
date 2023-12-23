import { sleep } from "./base";
import {dataYourDesk} from "../mock-data/matter.briefcase.yourdesk";


async function getDataYourDesk() {
  await sleep();
  return dataYourDesk;
}

export default {
  getDataYourDesk
};
