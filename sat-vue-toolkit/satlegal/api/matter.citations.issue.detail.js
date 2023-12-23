import { sleep } from "./base";
import { dataIssueDetail } from "../mock-data/matter.citations.issue.detail";

async function getDataIssueDetail() {
  await sleep();
  return dataIssueDetail;
}

async function updateIssueDetail(data) {
  await sleep();
  return data;
}

export default {
  getDataIssueDetail,
  updateIssueDetail
};
