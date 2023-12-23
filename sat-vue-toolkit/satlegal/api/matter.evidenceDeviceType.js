import { get, post, patch, remove } from "./base";

const mapSubject = (x) => {
  return {
    ...x,
    color: "#" + x.color
  }
}

async function getDataEvidenceDeviceType({matterId}) {
  const result = await get(`/api/matters/${matterId}/tagables/`, {
    params: {
      type: "evidence_device_type"
    }
  });

  return result.map(x => {
    return mapSubject(x)
  });
}

async function addEvidenceDeviceType(data) {
  const dataMap = {
    name: data.name,
    color: data.color && data.color.substring(1),
    type: "evidence_device_type"
  }
  const result = await post(`/api/matters/${data.matterId}/tagables/`, dataMap)
  return mapSubject(result);
}

async function updateEvidenceDeviceType(data) {
  const dataMap = {
    name: data.labelName,
    color: data.colorValue.substring(1),
    type: "evidence_device_type"
  }
  const result = await patch(`/api/matters/${data.matterId}/tagables/${data.id}/`, dataMap)
  return mapSubject(result);
}

async function removeEvidenceDeviceType(data) {
  const result = await remove(`/api/matters/${data.matterId}/tagables/${data.id}/`)
  return result;
}

export default {
  getDataEvidenceDeviceType,
  addEvidenceDeviceType,
  updateEvidenceDeviceType,
  removeEvidenceDeviceType
};
