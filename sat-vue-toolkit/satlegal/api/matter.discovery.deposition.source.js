import { get, post, patch, remove } from "./base";

async function getDataSource({ matterId, depositionId }) {
  const result = await get(
    `/api/matters/${matterId}/depositions/${depositionId}/sources/`
  );
  return result.map(x => ({ id: x.pk, name: x.source }));
}

async function addSource({ idParams, body }) {
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${
      idParams.depositionId
    }/sources/`,
    body
  );
  return {
    id: result.pk,
    name: result.source
  };
}

async function updateSource({ idParams, body }) {
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${
      idParams.depositionId
    }/sources/${idParams.sourceId}`,
    body
  );
  return {
    id: result.pk,
    name: result.source
  };
}

async function removeSource({ matterId, depositionId, sourceId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/sources/${sourceId}/`
  );
  return result;
}

export default {
  getDataSource,
  addSource,
  updateSource,
  removeSource
};
