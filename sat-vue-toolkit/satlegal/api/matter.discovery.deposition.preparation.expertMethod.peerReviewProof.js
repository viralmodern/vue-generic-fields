import { sleep } from "./base";
import { dataPeerReviewProof } from "../mock-data/matter.discovery.deposition.preparation.expertMethod.peerReviewProof";

async function getDataPeerReviewProof({ searchObject = {} }) {
  let results = dataPeerReviewProof;
  const convertArray = Object.keys(searchObject);
  if (!convertArray.includes("all")) {
    convertArray.forEach(key => {
      results = results.filter(x => {
        if (Array.isArray(x[key])) {
          return x[key].includes(searchObject[key]);
        } else {
          return x[key] === searchObject[key];
        }
      });
    });
  }
  return { results, count: results.length };
}

async function addPeerReviewProof({ data }) {
  await sleep();
  return {
    id: Math.random(),
    peer_review_proof: 0,
    ...data
  };
}

async function updatePeerReviewProof(data) {
  return data;
}

async function removePeerReviewProof(data) {
  await sleep();
  return data;
}

export default {
  getDataPeerReviewProof,
  addPeerReviewProof,
  updatePeerReviewProof,
  removePeerReviewProof
};
