import { sleep } from "./base";
import { dataQuestionToAnswer } from "../mock-data/matter.citations.issue.detail.questionToAnswer";

async function getDataQuestionToAnswer() {
  await sleep();
  return dataQuestionToAnswer;
}

async function addQuestionToAnswer(data) {
  await sleep();
  return data;
}

async function updateQuestionToAnswer(data) {
  await sleep();
  return data;
}

async function removeQuestionToAnswer(id) {
  await sleep();
  return id;
}

export default {
  getDataQuestionToAnswer,
  addQuestionToAnswer,
  updateQuestionToAnswer,
  removeQuestionToAnswer
};
