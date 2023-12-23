import { sleep } from "./base";
import { dataClientAddressbook } from "../mock-data/data-client-addressbook";

async function getDataPortalAddressbook() {
  await sleep();
  return JSON.parse(JSON.stringify(dataClientAddressbook));
}

async function createNewContact(data) {
  await sleep();
  return data;
}

export default {
  getDataPortalAddressbook,
  createNewContact
};
