import { get, post } from "./base";

async function getDataMatter() {
  const result = await get("/api/projects/");
  return result;
}

async function addDataMatter(data) {
  const dataMap = {
    name: data.title,
    members: data.members,
    start: new Date(data.startDate).toISOString(),
    end: new Date(data.endDate).toISOString(),
    description: data.description,
    color: "d3d3d3"
  };
  const result = await post("/api/matters/", dataMap);
  return result;
}

export default {
  getDataMatter,
  addDataMatter
};
