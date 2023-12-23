import { sleep } from "./base";
import { dataPartientProfile } from "../mock-data/matter.partient.profile";

async function getDataPartientProfile() {
  await sleep();
  return dataPartientProfile;
}

async function addDataPartientProfile(data) {
  await sleep();
  return data;
}

export default {
  getDataPartientProfile,
  addDataPartientProfile
};
