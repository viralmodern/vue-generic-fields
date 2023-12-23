import { sleep } from "./base";
import {practices} from '../mock-data/data-matter-partient-practice'
async function getListPractice() {
  await sleep();
  return practices
}
async function createPractice(data) {
  await sleep();
  return data
}
async function editPractice(data){
  await sleep();
  return data
}
async function removePractice(id){
  await sleep();
  return id
}

export default {
  getListPractice,
  createPractice,
  editPractice,
  removePractice
};
