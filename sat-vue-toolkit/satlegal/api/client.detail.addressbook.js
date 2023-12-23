import { sleep } from "./base";
import { dataClientAddressbook } from "../mock-data/data-client-addressbook";

async function getDataClientAddressbook() {
  await sleep();
  return dataClientAddressbook;
}

async function createNewContact(data) {
  await sleep();
  return data;
}

export default {
  getDataClientAddressbook,
  createNewContact
}
