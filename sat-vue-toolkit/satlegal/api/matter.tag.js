import { get, post, patch, remove } from "./base";

const mapSubject = (x) => {
  return {
    ...x,
    color: "#" + x.color
  }
}

async function getDataTag({matterId}) {
  const result = await get(`/api/matters/${matterId}/tagables/`, {
    params: {
      type: "tag"
    }
  });
  return result.map(x => {
    return mapSubject(x)
  });
}

async function addTag(data) {
  const dataMap = {
    name: data.name,
    color: data.color && data.color.substring(1),
    type: "tag"
  }
  const result = await post(`/api/matters/${data.matterId}/tagables/`, dataMap)
  return mapSubject(result);
}

async function updateTag(data) {
  const dataMap = {
    name: data.labelName,
    color: data.colorValue.substring(1),
    type: "tag"
  }
  const result = await patch(`/api/matters/${data.matterId}/tagables/${data.id}/`, dataMap)
  return mapSubject(result);
}

async function removeTag(data) {
  const result = await remove(`/api/matters/${data.matterId}/tagables/${data.id}/`)
  return result;
}

export default {
  getDataTag,
  addTag,
  updateTag,
  removeTag
};
