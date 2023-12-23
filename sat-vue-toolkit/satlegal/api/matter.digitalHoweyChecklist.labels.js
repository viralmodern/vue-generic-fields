import { sleep } from "./base";

async function getDataLabels() {
  await sleep();
  return [
    {
      id: 1981,
      color: "#7B84D8",
      text: "label 1",
      createAt: "2019-03-20T16:16:19.360Z"
    },
    {
      id: 1982,
      color: "#61bd4f",
      text: "label 2",
      createAt: "2019-03-20T16:16:59.582Z"
    },
    {
      id: 1983,
      color: "#851414",
      text: "label 3",
      createAt: "2019-03-20T16:16:59.582Z"
    },
    {
      id: 1984,
      color: "#331485",
      text: "label 4",
      createAt: "2019-03-20T16:16:59.582Z"
    },
    {
      id: 1985,
      color: "#853714",
      text: "label 5",
      createAt: "2019-03-20T16:16:59.582Z"
    },
  ]
}

async function addLabels(data) {
  await sleep();
  return data;
}

async function updateLabels(data) {
  await sleep();
  return data;
}

async function choseTag(data) {
  await sleep();
  return data;
}

async function removeLabels(data) {
  await sleep();
  return data;
}

export default {
  getDataLabels,
  addLabels,
  updateLabels,
  choseTag,
  removeLabels
};
