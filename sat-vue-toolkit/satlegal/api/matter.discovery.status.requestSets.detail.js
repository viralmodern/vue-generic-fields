import { get } from "./base";

async function getRequestSetDetail(params) {
  return await get(`/api/matters/${params.matterId}/request-sets/${params.rowId}/`)
}

export default {
  getRequestSetDetail
}
