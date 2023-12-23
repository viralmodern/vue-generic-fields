import { sleep } from "./base";
import data from "../mock-data/note-book";

async function addComment() {
  await sleep();
  return true;
}

async function getComments() {
  await sleep();
  const { dataComment } = data;
  return dataComment;
}
async function getAvailableMentions() {
  await sleep();
  return data.availableMentions;
}
export default {
  addComment,
  getComments,
  getAvailableMentions
};
