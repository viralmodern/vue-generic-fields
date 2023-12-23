import { get, post, patch, remove } from "./base";

const mapSubject = (x) => {
  return {
    ...x,
    color: "#" + x.color
  }
}

async function getDataRiskArea({matterId}) {
  const result = await get(`/api/matters/${matterId}/tagables/`, {
    params: {
      type: "risk-area"
    }
  });
  return result.map(x => {
    return mapSubject(x);
  });
}

async function addRiskArea(data) {
  const dataMap = {
    name: data.name,
    color: data.color && data.color.substring(1),
    type: "risk-area"
  }
  const result = await post(`/api/matters/${data.matterId}/tagables/`, dataMap)
  return mapSubject(result);
}

async function updateRiskArea(data) {
  const dataMap = {
    name: data.labelName,
    color: data.colorValue.substring(1),
    type: "risk-area"
  }
  const result = await patch(`/api/matters/${data.matterId}/tagables/${data.id}/`, dataMap)
  return mapSubject(result);
}

async function removeRiskArea(data) {
  const result = await remove(`/api/matters/${data.matterId}/tagables/${data.id}/`)
  return result;
}

export default {
  getDataRiskArea,
  addRiskArea,
  updateRiskArea,
  removeRiskArea
};
