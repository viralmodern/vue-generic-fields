import { get, patch } from "./base";

async function getDataToolbox({ matterId, toolboxId }) {
  const result = await get(`/api/matters/${matterId}/toolboxes/${toolboxId}/`);
  return {
    id: result.pk,
    matter: result.matter,
    name: result.name,
    description: result.desc,
    type: result.type,
    members: result.members,
    createAt: result.created,
  };
}

async function updateToolbox(data) {
  const dataMap = {
    name: data.name,
    desc: data.description,
    members: data.members
  };
  const result = await patch(
    `/api/matters/${data.matterId}/toolboxes/${data.toolboxId}/`,
    dataMap
  );
  return result;
}

export default {
  getDataToolbox,
  updateToolbox
};
