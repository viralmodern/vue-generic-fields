import { get, post, patch, remove, put } from "../../base";
import {
  formatQuery,
  getFieldNullAble,
  getFieldArrayNullAble,
  getFieldObjectNullAble,
} from "@/sat-vue-toolkit/satlegal/utils";

function mapResult(data) {
  // return data.map(x => {
  //   const result = {
  //     ...x,
  //     legal_counsels: x.legal_counsels.map(x => {
  //       return {
  //         id: x.pk,
  //         name: `${x.last_name} ${x.first_name}`,
  //         avatarUrl: x.avatar
  //       };
  //     }),
  //   }
  //   if (x.deponent) {
  //     result.deponent = {
  //       id: x.deponent.pk,
  //       name: `${x.deponent.last_name} ${x.deponent.first_name}`,
  //       avatarUrl: x.deponent.avatar
  //     }
  //   }
  //   return result;
  // });
  return data;
}

function mapObjectResult2(x) {
  // const result = {
  //   ...x,
  //   legal_issues: x.legal_issues.map(i => i.pk),
  //   labels: x.labels.map(i => i.pk),
  // };
  // if (x.deponent) {
  //   result.deponent = {
  //     id: x.deponent.pk,
  //     name: `${x.deponent.last_name} ${x.deponent.first_name}`,
  //     avatarUrl: x.deponent.avatar
  //   }
  // }
  // return result;
  return x;
}

async function getDataTestimony({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/testimonies/`;
  const options = {
    params: formatQuery(searchObject)
  };
  const group = {};
  Array.isArray(searchObject.group_items) &&
    searchObject.group_items.forEach(key => {
      group[key] = {
        pk: +key,
        results: [],
        totals: 0,
        next: null
      };
    });
  const result = await get(url, options);
  if (!searchObject.ungroup) {
    for (let key in result) {
      result[key] = {
        pk: +key,
        results: mapResult(result[key].results),
        totals: result[key].count || 0,
        next: result[key].next
      };
    }
    return { ...group, ...result };
  }
  return {
    all: {
      pk: "all",
      results: mapResult(result.results),
      totals: result.count,
      next: result.next
    }
  };
}

async function addTestimony({ idParams, body }) {
  const result = await post(
    `/api/matters/${idParams.matterId}/testimonies/`,
    body
  );
  return mapObjectResult2(result);
}

async function updateTestimony({ idParams, body }) {
  const bodyMap = {
    ...body
  };
  if (body.legal_counsels) {
    bodyMap.legal_counsels = body.legal_counsels.map(x => x.id);
  }
  if (body.characters) {
    bodyMap.characters = body.characters.map(x => x.id);
  }
  if (body.deponent) {
    bodyMap.deponent = body.deponent.id;
  }
  const result = await patch(
    `/api/matters/${idParams.matterId}/testimonies/${idParams.depositionId}/`,
    bodyMap
  );
  return mapObjectResult2(result);
}

async function removeTestimony({ matterId, depositionId }) {
  const result = await remove(
    `/api/matters/${matterId}/testimonies/${depositionId}/`
  );
  return result;
}

export default {
  getDataTestimony,
  addTestimony,
  updateTestimony,
  removeTestimony,
};
