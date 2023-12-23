import { get, post, patch, remove } from "./base";
import { formatQuery } from '../utils';
// import { dataKeyPleadings } from "../mock-data/matter.discovery.deposition.preparation.keyPleadings";

function mapResult(data) {
  return data.map(x => {
    return {
      id: x.pk,
      pleading: x.pleading,
      counter_claim: x.counterclaim,
      goals: x.goals.map(x => x.pk)
    }
  })
}

async function getDataKeyPleadings({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/`;
  const options = {
    params: formatQuery(searchObject)
  }
  const group = {};
  Array.isArray(searchObject.group_items) && searchObject.group_items.forEach(key => {
    group[key] = {
      pk: +key,
      list: [],
      totals: 0,
    }
  });
  const result = await get(url, options);
  if (!searchObject.ungroup) {
    for (let key in result) {
      const list = mapResult(result[key].results);
      result[key] = {
        pk: +key,
        list,
        totals: result[key].count || 0
      }
    }
    return {...group, ...result};
  }
  return {
    all: {
      pk: 'all',
      list: mapResult(result.results),
      totals: result.count,
    }
  }
}

async function addKeyPleadings({ idParams, body }) {
  const bodyMap = {
    pleading: body.pleading,
    counterclaim: body.counter_claim,
    goals: body.goals
  };
  const result = await post(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/`,
    bodyMap
  );
  return {
    id: result.pk,
    pleading: result.pleading,
    counter_claim: result.counterclaim,
    goals: result.goals.map(x => x.pk)
  };
}

async function updateKeyPleadings({ idParams, body }) {
  const bodyMap = {
    pleading: body.pleading,
    counterclaim: body.counter_claim,
    goals: body.goals
  };
  const result = await patch(
    `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/key-pleadings/${idParams.keyPleadingsId}/`,
    bodyMap
  );
  return result;
}

async function removeKeyPleadings({ matterId, depositionId, keyPleadingsId }) {
  const result = await remove(
    `/api/matters/${matterId}/depositions/${depositionId}/key-pleadings/${keyPleadingsId}/`
  );
  return result;
}

export default {
  getDataKeyPleadings,
  addKeyPleadings,
  updateKeyPleadings,
  removeKeyPleadings
};
