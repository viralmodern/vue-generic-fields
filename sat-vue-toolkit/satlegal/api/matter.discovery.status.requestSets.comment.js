import { get, post } from "./base";

async function getCommentRequestSets(params) {
  return await get(`/api/matters/${params.matterId}/request-sets/${params.rowId}/comments/?page=${params.page}`);
}

async function sendComment(bodyRequest) {
  return await post(`/api/matters/${bodyRequest.matterId}/request-sets/${bodyRequest.rowId}/comments/`, bodyRequest.body);
}

export default {
  getCommentRequestSets,
  sendComment
}
