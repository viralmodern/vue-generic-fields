import { get, post, patch, remove } from "../../base";
import { getFormData2 } from "@/sat-vue-toolkit/satlegal/utils";

async function getDaubertsFromApi({ matterId, depositionId, page }) {
  return await get(
    `/api/matters/${matterId}/depositions/${depositionId}/dauberts/?page=${page}`
  );
}

async function getDaubertsFromApiDetail({ matterId, depositionId, rowId }) {
  return await get(
    `/api/matters/${matterId}/depositions/${depositionId}/dauberts/${rowId}/`
  );
}

async function postDaubertsRequestApi({ matterId, depositionId, body }) {
  return await post(
    `/api/matters/${matterId}/depositions/${depositionId}/dauberts/`,
    body
  );
}

async function updateDaubertsRequestApi({
  matterId,
  depositionId,
  daubertId,
  body
}) {
  return await patch(
    `/api/matters/${matterId}/depositions/${depositionId}/dauberts/${daubertId}/`,
    body
  );
}

async function removeDaubertsRequestApi({ matterId, depositionId, daubertId }) {
  return await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/dauberts/${daubertId}/`
  );
}

// bookmark
async function addBookmark({ matterId, depositionId, daubertId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/dauberts/${daubertId}/bookmarks/`;
  const result = await post(url);
  return result;
}

async function removeBookmark({ matterId, depositionId, daubertId }) {
  const url = `/api/matters/${matterId}/depositions/${depositionId}/dauberts/${daubertId}/bookmarks/`;
  const result = await remove(url);
  return result;
}
// reviews
async function postCreateReviews({ matterId, depositionId, daubertId, body }) {
  return await post(
    `/api/matters/${matterId}/depositions/${depositionId}/dauberts/${daubertId}/reviews/`,
    body
  );
}
async function removeReviews({ matterId, depositionId, daubertId, reviewId }) {
  return await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/dauberts/${daubertId}/reviews/${reviewId}/`
  );
}
async function updateReviewsRequest({
  matterId,
  depositionId,
  daubertId,
  reviewId,
  body
}) {
  return await patch(
    `/api/matters/${matterId}/depositions/${depositionId}/dauberts/${daubertId}/reviews/${reviewId}/`,
    body
  );
}

// attachment
async function addAttachmentRequest({
  matterId,
  depositionId,
  daubertId,
  reviewId,
  body
}) {
  return await post(
    `/api/matters/${matterId}/depositions/${depositionId}/dauberts/${daubertId}/reviews/${reviewId}/attachments/`,
    getFormData2(body)
  );
}
async function updateAttachmentRequest({
  matterId,
  depositionId,
  daubertId,
  reviewId,
  body,
  attachmentId
}) {
  return await patch(
    `/api/matters/${matterId}/depositions/${depositionId}/dauberts/${daubertId}/reviews/${reviewId}/attachments/${attachmentId}/`,
    getFormData2(body)
  );
}
async function removeAttachmentRequest({
  matterId,
  depositionId,
  daubertId,
  reviewId,
  body,
  attachmentId
}) {
  return await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/dauberts/${daubertId}/reviews/${reviewId}/attachments/${attachmentId}/`,
    getFormData2(body)
  );
}

export default {
  // list daubert
  getDaubertsFromApi,
  postDaubertsRequestApi,
  updateDaubertsRequestApi,
  removeDaubertsRequestApi,
  // bookMark
  addBookmark,
  removeBookmark,
  // review
  postCreateReviews,
  updateReviewsRequest,
  removeReviews,
  //attachment
  addAttachmentRequest,
  updateAttachmentRequest,
  removeAttachmentRequest,
  //Detail
  getDaubertsFromApiDetail
};
