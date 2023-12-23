import { sleep } from "./base";
// import * as store  from "../ht_store"

async function getDataInboxDetail(id) {
  /*const dataInbox = store.getters["clientPortal/inbox/dataInbox"]
  await sleep();
  return (
    dataInbox.find(x => x.id === id) || {}
  );*/
}

async function addDataInboxDetail(data) {
  await sleep();
  return data;
}

async function updateDataInboxDetail(data) {
  await sleep();
  return data;
}


export default {
  getDataInboxDetail,
  addDataInboxDetail,
  updateDataInboxDetail
};
