import { sleep } from "./base";
import { dataMedicationLog } from "../mock-data/data-medication-log";

async function getDataMedicationLog() {
  await sleep();
  return dataMedicationLog;
}

export default {
  getDataMedicationLog
}
