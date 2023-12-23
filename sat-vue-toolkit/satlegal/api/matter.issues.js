import { get, post, patch, remove } from "./base";

const mapSubject = (x) => {
  return {
    ...x,
    color: "#" + x.color
  }
}

async function getDataIssues({matterId}) {
  const result = await get(`/api/matters/${matterId}/tagables/`, {
    params: {
      type: "legal-issue"
    }
  });
  return result.map(x => {
    return mapSubject(x);
  });
}

async function addIssues(data) {
  const dataMap = {
    name: data.name,
    color: data.color && data.color.substring(1),
    type: "legal-issue"
  }
  const result = await post(`/api/matters/${data.matterId}/tagables/`, dataMap)
  return mapSubject(result);
}

async function updateIssues(data) {
  const dataMap = {
    name: data.labelName,
    color: data.colorValue.substring(1),
    type: "legal-issue"
  }
  const result = await patch(`/api/matters/${data.matterId}/tagables/${data.id}/`, dataMap)
  return mapSubject(result);
}

async function removeIssues(data) {
  const result = await remove(`/api/matters/${data.matterId}/tagables/${data.id}/`)
  return result;
}

export default {
  getDataIssues,
  addIssues,
  updateIssues,
  removeIssues
};
