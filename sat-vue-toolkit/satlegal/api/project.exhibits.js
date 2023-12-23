import { sleep } from "./base";
import data from "../mock-data/note-book";
import {
  dataSectionExhibits,
  dataSpreadsheet
} from "../mock-data/data-Spreadsheet";

async function getDataHistoryExhibits() {
  await sleep();
  const { dataHistory } = data;
  return {
    dataHistory
  };
}

async function getDataCommentExhibits() {
  await sleep();
  const { dataComment } = data;
  return {
    dataComment
  };
}

async function getExhibitsAvailableMentions() {
  await sleep();
  return data.availableMentions;
}

async function addSubSectionExhibits(name, parentId) {
  await sleep();

  let newItem = {
    id: 1995,
    name: name,
    content: ""
  };
  return {
    newItem,
    parentId,
    status: true
  };
}

async function getDataSectionExhibits() {
  await sleep();
  return dataSectionExhibits;
}

async function getDataSpreadsheet() {
  await sleep();
  return dataSpreadsheet;
}

export default {
  getDataHistoryExhibits,
  getDataCommentExhibits,
  getExhibitsAvailableMentions,
  addSubSectionExhibits,
  getDataSectionExhibits,
  getDataSpreadsheet
};
