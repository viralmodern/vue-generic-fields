import { sleep } from "./base";
import {
  dataCurrentWeek,
  dataListDate,
  dataTimeEntriesHeatmap
} from "../mock-data/time-entry";

async function getDataCurrentWeek() {
  await sleep();
  return {
    dataCurrentWeek
  };
}

async function getDataListDate() {
  await sleep();
  return {
    dataListDate
  };
}

async function getdataTimeEntriesHeatmap() {
  await sleep();
  return {
    dataTimeEntriesHeatmap
  };
}

export default {
  getDataCurrentWeek,
  getDataListDate,
  getdataTimeEntriesHeatmap
};
