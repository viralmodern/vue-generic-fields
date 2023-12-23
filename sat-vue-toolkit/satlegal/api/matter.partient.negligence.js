import { sleep } from "./base";
import {negligence} from '../mock-data/data-matter-partient-negligence'
async function getListNegligence() {
  await sleep();
  return negligence
}
async function createNegligence(data) {
  await sleep();
  return data
}
async function editNegligence(data){
  await sleep();
  return data
}
async function removeNegligence(id){
  await sleep();
  return id
}

export default {
  getListNegligence,
  createNegligence,
  editNegligence,
  removeNegligence
};
