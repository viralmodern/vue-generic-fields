import { sleep } from "./base";
import data from "../mock-data/task-detail";

async function getDetailTask() {
  await sleep();
  const { taskDetail } = data;
  return taskDetail;
}

async function getDataMemberProject() {
  await sleep();
  const { dataMemberProject } = data;
  return dataMemberProject;
}

async function getDataPeopleGroup() {
  await sleep();
  const { dataPeoPleGroup } = data;
  return dataPeoPleGroup;
}

async function getDataProjectGroup() {
  await sleep();
  const { dataProjectGroup } = data;
  return dataProjectGroup;
}

async function getDataTagGroup() {
  await sleep();
  const { dataGroupTags } = data;
  return dataGroupTags;
}

async function getFiles() {
  await sleep();
  const { files } = data;
  return files;
}
async function getWorklog() {
  await sleep();
  const { worklogs } = data;
  return worklogs;
}

async function getTag() {
  await sleep();
  const { taskTags } = data;
  return taskTags;
}

async function getSubTask() {
  await sleep();
  const { dataSubTasks } = data;
  return dataSubTasks;
}

async function getActivities() {
  await sleep();
  const { activities } = data;
  return activities;
}

async function getListCheckbox() {
  await sleep();
  const { listCheckbox } = data;
  return listCheckbox;
}

async function getTicketMessages() {
  await sleep();
  const { ticketMessages } = data;
  return ticketMessages;
}

async function getDataMemberTask() {
  await sleep();
  const { dataMemberProject } = data;
  return dataMemberProject;
}

async function getAvailableMentions() {
  await sleep();
  const { availableMentions } = data;
  return availableMentions;
}

async function getListNotes() {
  await sleep();
  const { listNotes } = data;
  return listNotes;
}

async function getListTaskDetailSelect() {
  await sleep();
  const { dataTaskDetailSelect } = data;
  return dataTaskDetailSelect;
}

async function getListPeople() {
  await sleep();
  const { dataPeoples } = data;
  return dataPeoples;
}

async function getListTags() {
  await sleep();
  const { dataTagsDetail } = data;
  return dataTagsDetail;
}

async function saveStartDate(startDate) {
  await sleep();
  return startDate;
}

async function saveEndDate(endDate) {
  await sleep();
  return endDate;
}

async function getDataLabels() {
  await sleep();
  const { dataLabels } = data;
  return dataLabels;
}

async function getDataListLabel() {
  await sleep();
  const { dataListLabels } = data;
  return dataListLabels;
}

async function getAttachment() {
  await sleep();
  const { dataAttachment } = data;
  return dataAttachment;
}

async function getDataCitation() {
  await sleep();
  const { dataCitation } = data;
  return dataCitation;
}

async function getListLocation() {
  await sleep();
  const { dataLocation } = data;
  return dataLocation;
}

async function getListCompelete() {
  await sleep();
  const { itemsCompelete } = data;
  return itemsCompelete;
}

async function getListsFeature() {
  await sleep();
  const { itemsFeature } = data;
  return itemsFeature;
}

async function getListEstimate() {
  await sleep();
  const { itemsEstimate } = data;
  return itemsEstimate;
}
async function getListsWorks() {
  await sleep();
  const { itemsWorks } = data;
  return itemsWorks;
}

async function addDataCitation() {
  await sleep();
  return {
    status: true,
    message: "Create Success!"
  };
}

async function updateDataCitation() {
  await sleep();
  return {
    status: true,
    message: "Update Success!"
  };
}

export default {
  getDetailTask,
  getDataMemberProject,
  getDataProjectGroup,
  getDataTagGroup,
  getTag,
  getSubTask,
  getFiles,
  getActivities,
  getListCheckbox,
  getTicketMessages,
  getAvailableMentions,
  getListNotes,
  getWorklog,
  getListTaskDetailSelect,
  getListPeople,
  getListTags,
  saveStartDate,
  saveEndDate,
  getDataLabels,
  getDataListLabel,
  getAttachment,
  getDataCitation,
  getDataMemberTask,
  getListLocation,
  getListCompelete,
  getListsFeature,
  getListEstimate,
  getDataPeopleGroup,
  addDataCitation,
  updateDataCitation,
  getListsWorks
};
