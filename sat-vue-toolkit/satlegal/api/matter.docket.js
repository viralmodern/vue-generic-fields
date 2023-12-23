import { sleep } from "./base";
import { dataDocket, infomation } from "../mock-data/data-docket";

async function getDataDocket() {
  await sleep();
  return dataDocket;
}
async function updateDocket(data) {
  await sleep();
  return data;
}
async function deleteDocket(data) {
  await sleep();
  return data;
}
async function addDocket(data) {
  await sleep();
  return data;
}
async function getInformation() {
  await sleep();
  return infomation;
}
async function changeDataInfomation(data) {
  await sleep();
  return data;
}
async function changeDate() {
  await sleep();
  return new Date().toISOString();
}

export default {
  getDataDocket,
  updateDocket,
  deleteDocket,
  addDocket,
  getInformation,
  changeDataInfomation,
  changeDate
};
