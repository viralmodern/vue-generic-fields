import { sleep } from "./base";
import data from "../mock-data/data-meeting";

async function getDataMeetingWeekly() {
  await sleep();
  const { dataMeetingWeekly } = data;
  return dataMeetingWeekly
}


export default {
    getDataMeetingWeekly,
};
