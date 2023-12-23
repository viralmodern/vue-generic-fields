import { sleep } from "./base";
import { dataRequirements } from "../mock-data/data-requirements";
import {
  dataApprovals,
  dataCategory,
  dataLifecycle
} from "../mock-data/data-filing-room";
import { dataDocument } from "../mock-data/document-filing";
import {
  myDataTimerTracking,
  memberDataTimeTracking
} from "../mock-data/filing-timer-tracking";
import {
  ticketMessages,
  availableMentions
} from "../mock-data/filing-menu-comment";
import { dataRelation, dataTransations } from "../mock-data/data-Relation";
import { sectionHeadline } from "../mock-data/section-headline";

async function getDataApprovals() {
  await sleep();
  return dataApprovals;
}

async function getDataSectionHeadline() {
  await sleep();
  return sectionHeadline;
}

async function getDataCategory() {
  await sleep();
  return dataCategory;
}

async function getDataFilingDocument() {
  await sleep();
  return dataDocument;
}

async function getDataLifecycle() {
  await sleep();
  return dataLifecycle;
}

async function getDataRelation() {
  await sleep();
  return dataRelation;
}

async function getDataTransations() {
  await sleep();
  return dataTransations;
}

async function deleteRelation(object) {
  await sleep();
  return object;
}

async function deleteTransations(object) {
  await sleep();
  return object;
}

async function postDataRelations(objectRelations) {
  await sleep();
  return objectRelations;
}

async function postTransations(objectTransations) {
  await sleep();
  return objectTransations;
}

async function getDataRequirements() {
  await sleep();
  return dataRequirements;
}

async function saveSectionContent(dataGuidelines) {
  await sleep();
  return dataGuidelines;
}

async function getDataTimeTrackingByme() {
  await sleep();
  return myDataTimerTracking;
}

async function getDataTimeTrackingMember() {
  await sleep();
  return memberDataTimeTracking;
}

async function getDataAvailableMentions() {
  await sleep();
  return availableMentions;
}

async function getDataTicketMessages() {
  await sleep();
  return ticketMessages;
}

async function postTimerTracking(objectTimerTracking) {
  await sleep();
  return objectTimerTracking;
}

async function postDocumentFile(documentFile) {
  await sleep();
  return documentFile;
}

async function postDataComment(newComment) {
  await sleep();
  return newComment;
}

export default {
  getDataApprovals,
  getDataCategory,
  getDataLifecycle,
  getDataRequirements,
  getDataFilingDocument,
  postDocumentFile,
  saveSectionContent,
  getDataRelation,
  getDataTransations,
  getDataSectionHeadline,
  postDataRelations,
  deleteTransations,
  postTransations,
  getDataTimeTrackingByme,
  getDataAvailableMentions,
  getDataTicketMessages,
  getDataTimeTrackingMember,
  postTimerTracking,
  postDataComment,
  deleteRelation
};
