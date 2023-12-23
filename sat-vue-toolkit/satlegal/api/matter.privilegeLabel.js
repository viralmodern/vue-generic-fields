import { get, post, patch, remove } from "./base";

const mapData = (x) => {
  return {
    ...x,
    color: "#" + x.color
  }
}

async function getDataPrivilegeLabel({matterId}) {
  const result = await get(`/api/matters/${matterId}/tagables/`, {
    params: {
      type: "privilege-label"
    }
  });
  return result.map(x => {
    return mapData(x);
  });
}

async function addPrivilegeLabel(data) {
  const dataMap = {
    name: data.name,
    color: data.color && data.color.substring(1),
    type: "privilege-label"
  }
  const result = await post(`/api/matters/${data.matterId}/tagables/`, dataMap)
  return mapData(result);
}

async function updatePrivilegeLabel(data) {
  const dataMap = {
    name: data.labelName,
    color: data.colorValue.substring(1),
    type: "privilege-label"
  }
  const result = await patch(`/api/matters/${data.matterId}/tagables/${data.id}/`, dataMap)
  return mapData(result);
}

async function removePrivilegeLabel(data) {
  const result = await remove(`/api/matters/${data.matterId}/tagables/${data.id}/`)
  return result;
}

export default {
  getDataPrivilegeLabel,
  addPrivilegeLabel,
  updatePrivilegeLabel,
  removePrivilegeLabel
};
