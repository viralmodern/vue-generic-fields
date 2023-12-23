import { get } from "./base";

async function getProceeding({ matterId, depositionId, boardId, listId }) {
  const proceeding_items = await get(`/api/matters/${matterId}/depositions/${depositionId}/boards/`);
  const dataList = boardId ? await get(`/api/matters/${matterId}/depositions/${depositionId}/boards/${boardId}/lists/`) : [];
  const dataQuestions = listId ? await get(`/api/matters/${matterId}/depositions/${depositionId}/boards/${boardId}/lists/${listId}/cards/`) : [];
  return {
    proceeding_items,
    dataList: (dataList || []).map(x => ({
      ...x,
      proceeding_pk: proceeding_items.find(f => f.pk === x.board).pk
    })),
    dataQuestions: (dataQuestions || []).map(x => ({
      ...x,
      progress: 1,
      result_progress: 2,
      list_pk: dataList.find(f => f.pk === x.pk).pk
    }))
  };
}

async function addList(req) {
  return req;
}

async function addTask(req) {
  return req;
}

async function updateQuestions(req) {
  return req;
}

export default {
  getProceeding,
  addList,
  addTask,
  updateQuestions
}
