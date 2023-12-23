import { sleep } from "./base";
import { listPeopelWorking, listAttachment } from "../mock-data/data-filing-room";

async function getDataPeopelWorking() {
  await sleep();
  return listPeopelWorking;
}

async function getDataAttachment() {
  await sleep();
  return listAttachment;
}

export default {
  getDataPeopelWorking,
  getDataAttachment
};
