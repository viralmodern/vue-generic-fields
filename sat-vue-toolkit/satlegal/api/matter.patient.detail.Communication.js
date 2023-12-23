import { dataCommunication } from "../mock-data/data-communication";
import { sleep } from './base';

async function getDataCommunication() {
  await sleep();
  return dataCommunication;
}

async function getDetailCommunication() {
  await sleep();
  return dataCommunication[0]
}

export default {
  getDataCommunication,
  getDetailCommunication
}
