import { get, post, patch, remove } from "./base";
// import { dataDeposition } from "../mock-data/matter.toolbox.deposition";

async function getDataDeposition({ matterId, toolboxId, page }) {
  const { results, count } = await get(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/depositions/`,
    {
      params: {
        page
      }
    }
  );
  const dataMap = results.map(x => {
    return {
      id: x.pk,
      time: x.time,
      asker: [], // hỏi lại trong ảnh thì là 1 mảng
      respondent: x.respondent.pk,
      question: x.question,
      answer: x.answer,
      tags: x.tags.map(x => x.pk),
      characters: []
    };
  });
  return {
    results: dataMap,
    count
  };
}

async function addDeposition({ idParams, body }) {
  const result = await post(
    `/api/matters/${idParams.matterId}/toolboxes/${
      idParams.toolboxId
    }/depositions/`,
    body
  );
  /*
  hiện tại tạo không được :
    - asker trong requirement là 1 mảng members và chọn nhiều member được
    trên api thì là 1 mảng characters và chọn 1 character
  */
  return result;
}

async function updateDeposition({ idParams, body }) {
  const result = await patch(
    `/api/matters/${idParams.matterId}/toolboxes/${
      idParams.toolboxId
    }/depositions/${idParams.depositionId}/`,
    body
  );
  return result;
}

async function removeDeposition({ matterId, toolboxId, depositionId }) {
  const result = await remove(
    `/api/matters/${matterId}/toolboxes/${toolboxId}/depositions/${depositionId}/`
  );
  return result;
}

export default {
  getDataDeposition,
  addDeposition,
  updateDeposition,
  removeDeposition
};
