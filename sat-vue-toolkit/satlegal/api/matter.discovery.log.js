import { get, post } from "./base";

async function getDataLog({page, matterId}) {
  const result = await get(`/api/matters/${matterId}/logs/`,{
    params: {
      page
    }
  })
  return result;
}

async function addDataLog(data) {
  const dataLog = {
    name: data.name,
    type: data.type,
    desc: data.description,
    members: data.members,
    tags: data.tags
  }
  const result = post(`/api/matters/${data.matterId}/logs/`, dataLog)
  return result;
}

export default {
  getDataLog,
  addDataLog
};
