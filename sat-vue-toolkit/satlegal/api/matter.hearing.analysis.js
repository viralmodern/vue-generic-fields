import { sleep } from "./base";

async function updateTimeAnalysis(data) {
  await sleep()
  return data;
}

async function updateTranscriptAnalysis(data) {
  await sleep()
  return data;
}

async function updateFavorableAnalysis(data) {
  await sleep()
  return data;
}

async function updateObjectionAnalysis(data) {
  await sleep()
  return data;
}

async function updateTextAssessment() {
  await sleep()
  return {
    status: true,
    message: "Update Data Success"
  };
}

export default {
  updateTimeAnalysis,
  updateTranscriptAnalysis,
  updateFavorableAnalysis,
  updateObjectionAnalysis,
  updateTextAssessment
}