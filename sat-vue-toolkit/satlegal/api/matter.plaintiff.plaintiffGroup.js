import { sleep } from "./base";
import { labelPlaintiff } from "../mock-data/data.matter.plaintiff.plaintiffGroup";

async function getDataPlaintiffGroup() {
  await sleep();
  return labelPlaintiff;
}

async function create(data) {
  await sleep();
  return data;
}

async function update(data) {
  await sleep();
  return data;
}

async function remove(data) {
  await sleep();
  return data;
}

export default {
  getDataPlaintiffGroup,
  create,
  update,
  remove
};
