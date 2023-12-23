import { sleep } from "./base";
import {dataComplaints, dataClaim, dataOverview} from "../mock-data/project-detail-overview";

async function listOverviewComplaint(id) {
  // eslint-disable-next-line
  console.log('listOverviewComplaint', id)
  await sleep();
  return dataComplaints;
}
async function listOverviewClaim(id) {
  // eslint-disable-next-line
  console.log('listOverviewClaim', id)
  await sleep();
  return dataClaim;
}
async function getOverviewDetail(){
  await sleep();
  return dataOverview
}
export default {
  listOverviewComplaint,
  getOverviewDetail,
  listOverviewClaim
};
