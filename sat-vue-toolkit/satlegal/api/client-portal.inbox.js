import { sleep } from "./base";
import { dataInbox } from "../mock-data/client-portal.inbox";


async function getDataInbox() {
  await sleep();
  return dataInbox;
}

async function addDataInbox(data) {
  await sleep();
  const listInbox = [];
  data.client.forEach(x =>
    listInbox.push({ id: Math.random(), ...data, fromId: x })
  );
  return listInbox;
}

async function updateDataInbox(data) {
  await sleep();
  return data;
}

async function deleteDataInbox(id) {
  await sleep();
  return id;
}

export default {
  getDataInbox,
  addDataInbox,
  updateDataInbox,
  deleteDataInbox
};
