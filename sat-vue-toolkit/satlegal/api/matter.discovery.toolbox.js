import { get, post} from "./base";
// import { dataToolbox } from "../mock-data/matter.discovery.toolbox";

async function getDataToolbox(toolbox) {
  const result = await get(`/api/matters/${toolbox.matterId}/toolboxes/`, {
    params: {
      page: toolbox.page,
    }
  })
  return result;
}

async function addDataToolbox(data) {
  const dataMap = {
    name: data.name,
    desc: data.description,
    type: data.type,
    tags: data.tags,
    members: data.members
  }
  const result = await post(`/api/matters/${data.matterId}/toolboxes/`, dataMap);
  result.creator = data.creator;
  return result;
}

export default {
  getDataToolbox,
  addDataToolbox
};
