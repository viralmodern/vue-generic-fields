import { get, post, patch, remove } from "./base";

async function getDataRequestTask(request) {
  const dataApi = await get(`/api/matters/${request.matterId}/request-sets/6/tasks/`, {
    params: {
      page: request.page
    }
  });
  const dataMap = dataApi.map(x => ({
    ...x, id: x.pk
  }));
  return dataMap;
}
async function editRequestTask(data) {
  const result = { [data.columnName]: data.newValue, id: data.taskId, matterId: data.matterId };
  const dataFromAPi = await patch(`/api/matters/19/request-sets/6/tasks/${result.id}/`, result);

  return dataFromAPi;
}

async function addRequestTask(data) {
  const dataFromAPi = await post(`/api/matters/19/request-sets/6/tasks/`, data);
  const dataMap = dataFromAPi.map(x => ({
    ...x, id: x.pk
  }));
  return dataMap;
}

async function deleteRequestTask(id) {
  await remove(`/api/matters/19/request-sets/6/tasks/${id}`);
}
export default {
  getDataRequestTask,
  editRequestTask,
  addRequestTask,
  deleteRequestTask
};
