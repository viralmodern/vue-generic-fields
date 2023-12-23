import { get, post } from "./base";

async function getAllFiles(req) {
  return await get(`/api/matters/${req.matterId}/depositions/${req.depositionId}/transcript`);
}

async function uploadFiles(req) {
  return await post(`/api/matters/${req.matterId}/depositions/${req.depositionId}/transcript`, req.transcript);
}

export default {
  getAllFiles,
  uploadFiles
}
