import { get } from "./base";

async function getRequestTaskDetail(params) {
  return await get(`/api/matters/${params.matterId}/request-sets/${params.rowId}/tasks/${params.taskId}/`)
}

export default {
  getRequestTaskDetail
}
