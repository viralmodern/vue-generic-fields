import { post, remove, patch, get } from "./base";

// Differences
async function getFactsDifferences(request) {
  return await get(`/api/matters/${request.matterId}/facts/${request.factId}/diffs/?page=${request.page}`)
}
async function addFactsDifferences(request) {
  return await post(`/api/matters/${request.matterId}/facts/${request.factId}/diffs/`, { desc: request.desc })
}
async function updateFactsDifferences(request) {
  return await patch(`/api/matters/${request.matterId}/facts/${request.factId}/diffs/${request.diffsId}/`, { desc: request.desc })
}
async function removeFactsDifferences(request) {
  return await remove(`/api/matters/${request.matterId}/facts/${request.factId}/diffs/${request.diffsId}/`)
}
// Similarities
async function getFactsSimilarities(request) {
  return await get(`/api/matters/${request.matterId}/facts/${request.factId}/diffs/?page=${request.page}`)
}
async function addFactsSimilarities(request) {
  return await post(`/api/matters/${request.matterId}/facts/${request.factId}/diffs/`, { desc: request.desc })
}
async function updateFactsSimilarities(request) {
  return await patch(`/api/matters/${request.matterId}/facts/${request.factId}/diffs/${request.diffsId}/`, { desc: request.desc })
}
async function removeFactsSimilarities(request) {
  return await remove(`/api/matters/${request.matterId}/facts/${request.factId}/diffs/${request.diffsId}/`)
}

export default {
  // Differences
  getFactsDifferences,
  addFactsDifferences,
  updateFactsDifferences,
  removeFactsDifferences,
  // Similarities
  getFactsSimilarities,
  addFactsSimilarities,
  updateFactsSimilarities,
  removeFactsSimilarities,
};
