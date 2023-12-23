import { get, post } from "./base";

async function getCommentRequestTask(params) {
  return await get(`/api/matters/19/request-sets/6/tasks/5/comments/?page=${params.page}`);
}

async function sendComment(bodyRequest) {
  return await post(`/api/matters/19/request-sets/6/tasks/5/comments/?page=${bodyRequest.page}`, bodyRequest.body);
}

export default {
  getCommentRequestTask,
  sendComment
}
