import { get, post } from "./base";
// import { dataDeposition } from "../mock-data/matter.discovery.deposition";

async function getDataDeposition({ matterId, query = {} }) {
  const { results, count } = await get(
    `/api/matters/${matterId}/depositions/`,
    {
      params: {
        page: query.page,
        creator: query.creator,
        deponent_type: query.type,
      }
    }
  );
  return {
    results: results.map(x => ({
      id: x.pk,
      name: x.name,
      creator: x.creator,
      created_at: x.created,
      description: x.desc,
      members: x.members.filter(userId => userId !== x.creator),
      type: x.deponent_type
    })),
    count
  };
}

async function addDataDeposition({ idParams, body }) {
  const bodyMap = {
    name: body.name,
    desc: body.description,
    deponent_type: body.type,
    members: body.members
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/`,
    bodyMap
  );
  return {
    id: result.pk,
    name: result.name,
    creator: result.creator,
    created_at: result.created,
    description: result.desc,
    members: result.members.filter(userId => userId !== result.creator),
    type: result.deponent_type
  };
}

export default {
  getDataDeposition,
  addDataDeposition
};
