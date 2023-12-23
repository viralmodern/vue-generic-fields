import { sleep } from "./base";
import { dataPatientProfile } from "../mock-data/data-patient-profile";

async function getDataPatientProfile() {
  await sleep();
  return dataPatientProfile;
}

export default {
  getDataPatientProfile
}
