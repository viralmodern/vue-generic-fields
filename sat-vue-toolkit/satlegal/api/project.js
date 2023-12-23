import { sleep } from "./base";
import { dataBackgroundColor } from "../mock-data/data-background-color";
import { dataIntived, detailInvitedMember } from "../mock-data/general-intived";
import {
  dataAssignedTome,
  dataLabels,
  dataSchedule,
  dataProject
} from "../mock-data/data-project";
import {
  dataAgenda,
  projectMeeting,
  dataMembers,
  detailMembers
} from "../mock-data/data-detail-project-meeting";

async function getDatathemeColorProject() {
  await sleep();
  return dataBackgroundColor;
}

async function getProjectMembers() {
  await sleep();
  return dataIntived;
}

async function createThemeColor(itemColor) {
  await sleep();
  return itemColor;
}

async function inviteMemberToProject(emailAddress) {
  await sleep();
  return emailAddress;
}

async function getDataProjectAssignToMe() {
  await sleep();
  return dataAssignedTome;
}

async function getDataProjectManageByMe() {
  await sleep();
  return dataAssignedTome;
}

async function getDataprojectMeeting() {
  await sleep();
  return dataAgenda;
}

async function getProjectDetail(projectId) {
  await sleep();
  return {
    id: projectId,
    type: (projectId => {
      switch (projectId % 3) {
        case 0:
          return "general";
        case 1:
          return "byzantine";
        default:
          return "filing";
      }
    })(projectId),
    name:
      projectId % 3 === 1
        ? "Byzantine ACME Frontend Application"
        : projectId % 3 === 2
        ? "Filing ACME Frontend Application"
        : "General Frontend Project"
  };
}

async function getDataLableByProject() {
  await sleep();
  return dataLabels;
}

async function getDataProjectSchedule() {
  await sleep();
  return dataSchedule;
}

async function getDataProjectById() {
  await sleep();
  return dataProject[2];
}

async function getDetailInvitedMember() {
  await sleep();
  return detailInvitedMember;
}

async function getProjectMeeting() {
  await sleep();
  return projectMeeting;
}

async function getDataMembers() {
  await sleep();
  return dataMembers;
}

async function getDetailMembers() {
  await sleep();
  return detailMembers;
}

async function postCreateNewMeeting(data) {
  await sleep();
  return data;
}

async function postNewItemOfMeeting(data) {
  await sleep();
  return data;
}

export default {
  getDatathemeColorProject,
  getProjectDetail,
  getProjectMembers,
  createThemeColor,
  inviteMemberToProject,
  getDataProjectManageByMe,
  getDataProjectAssignToMe,
  getDataLableByProject,
  getDataprojectMeeting,
  getDataProjectSchedule,
  getDataProjectById,
  getDetailInvitedMember,
  getProjectMeeting,
  postCreateNewMeeting,
  getDataMembers,
  getDetailMembers,
  postNewItemOfMeeting
};
