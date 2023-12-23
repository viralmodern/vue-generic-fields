import { get, post, patch, remove } from "../../base";

const mapSubject = (x) => {
  return {
    ...x,
    color: "#" + x.color
  }
}

async function getDataCommunicationLabel() {
  const result = await get(`/api/workspace-tagables/`, {
    params: {
      type: 3
    }
  });
  return result.results.map(x => {
    return mapSubject(x)
  });
}

async function addCommunicationLabel(data) {
  const dataMap = {
    name: data.name,
    color: data.color && data.color.substring(1),
    type: 3
  }
  const result = await post(`/api/workspace-tagables/`, dataMap)
  return mapSubject(result);
}

async function updateCommunicationLabel(data) {
  const dataMap = {
    name: data.labelName,
    color: data.colorValue.substring(1),
    type: 3
  }
  const result = await patch(`/api/workspace-tagables/${data.id}/`, dataMap)
  return mapSubject(result);
}

async function removeCommunicationLabel(data) {
  const result = await remove(`/api/workspace-tagables/${data.id}/`)
  return result;
}

export default {
  getDataCommunicationLabel,
  addCommunicationLabel,
  updateCommunicationLabel,
  removeCommunicationLabel
};
