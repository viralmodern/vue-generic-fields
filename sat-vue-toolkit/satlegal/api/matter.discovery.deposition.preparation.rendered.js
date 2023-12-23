import { sleep } from "./base";
import { dataRendered } from "../mock-data/matter.discovery.deposition.preparation.rendered";
async function getDataRendered() {
  await sleep();
  return dataRendered;
}
async function addDataRendered(data) {
  await sleep();
  return data
}
async function updateDataRendered(data){
  await sleep();
  return data
}
async function removeRendered(id){
  await sleep();
  return id
}

export default {
  getDataRendered,
  addDataRendered,
  updateDataRendered,
  removeRendered
};
