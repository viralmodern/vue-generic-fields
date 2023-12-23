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

async function getDataWitness({ idParams, searchObject = {} }) {
  // const url = `/api/matters/${idParams.matterId}/testimonies/`;
  // const options = {
  //   params: formatQuery(searchObject)
  // };
  // const group = {};
  // Array.isArray(searchObject.group_items) &&
  //   searchObject.group_items.forEach(key => {
  //     group[key] = {
  //       pk: +key,
  //       results: [],
  //       totals: 0,
  //       next: null
  //     };
  //   });
  // const result = await get(url, options);
  // if (!searchObject.ungroup) {
  //   for (let key in result) {
  //     result[key] = {
  //       pk: +key,
  //       results: mapResult(result[key].results),
  //       totals: result[key].count || 0,
  //       next: result[key].next
  //     };
  //   }
  //   return { ...group, ...result };
  // }
  // return {
  //   all: {
  //     pk: "all",
  //     results: mapResult(result.results),
  //     totals: result.count,
  //     next: result.next
  //   }
  // };
  return {
    all : {
      pk: "all",
      results: [
        {
          pk: 1,
          witness: [
            {
              "pk": 1,
              "name": "Andreas Haha Antonopolous",
              "avatar": "https://satlegal.ebitc.com/media/character/avatars/1/bo-anh-nude-tuyet-dep-lam-tan-chay-moi-anh-nhin--1400648614-537c33a6d50ce.jpg"
            },
            {
              "pk": 2,
              "name": "Huy Hoàng Nguyễn",
              "avatar": "https://satlegal.ebitc.com/media/character/avatars/2/29745651_951309118366172_1217776064_n.jpg"
            }
          ],
          party_witness: 1,
          witness_jurisidiction: 1,
          compel_to_trial: 1,
          witness_willingness: 1,
          witness_reliability: 1,
          witness_credibility: 1,
          witnes_role: 1,
          witness_legal_issue_role: [
            {
              pk:1,
              text: "hello",
            },
            {
              pk:2,
              text: "hello 2",
            }
          ],
          relations_info: {
            first_class_relations: [
              {
                content_type_id: 82,
                name: "bbbb",
                pk: "293",
              },
              {
                content_type_id: 82,
                name: "fact",
                pk: "289"
              }
            ]
          },
          total_comment: 10,
          total_note: 10,
          flag: true
        },
        {
          pk: 2,
          witness: [
            {
              "pk": 1,
              "name": "Andreas HahaAntonopolous ",
              "avatar": "https://satlegal.ebitc.com/media/character/avatars/1/bo-anh-nude-tuyet-dep-lam-tan-chay-moi-anh-nhin--1400648614-537c33a6d50ce.jpg"
            },
            {
              "pk": 2,
              "name": "Huy Hoàng Nguyễn",
              "avatar": "https://satlegal.ebitc.com/media/character/avatars/2/29745651_951309118366172_1217776064_n.jpg"
            }
          ],
          party_witness: 1,
          witness_jurisidiction: 1,
          compel_to_trial: 1,
          witness_willingness: 1,
          witness_reliability: 1,
          witness_credibility: 1,
          witnes_role: 1,
          witness_legal_issue_role: [
            {
              pk:1,
              text: "hello",
            },
            {
              pk:2,
              text: "hello 2",
            }
          ],
          relations_info: {
            first_class_relations: [
              {
                content_type_id: 82,
                name: "bbbb",
                pk: "293",
              },
              {
                content_type_id: 82,
                name: "fact",
                pk: "289"
              }
            ]
          },
          total_comment: 10,
          total_note: 10,
          flag: true
        },
        {
          pk: 3,
          witness: [
            {
              "pk": 1,
              "name": "Antonopolous Andreas Haha",
              "avatar": "https://satlegal.ebitc.com/media/character/avatars/1/bo-anh-nude-tuyet-dep-lam-tan-chay-moi-anh-nhin--1400648614-537c33a6d50ce.jpg"
            },
            {
              "pk": 2,
              "name": "Huy Hoàng Nguyễn",
              "avatar": "https://satlegal.ebitc.com/media/character/avatars/2/29745651_951309118366172_1217776064_n.jpg"
            }
          ],
          party_witness: 1,
          witness_jurisidiction: 1,
          compel_to_trial: 1,
          witness_willingness: 1,
          witness_reliability: 1,
          witness_credibility: 1,
          witnes_role: 1,
          witness_legal_issue_role: [
            {
              pk:1,
              text: "hello",
            },
            {
              pk:2,
              text: "hello 2",
            }
          ],
          relations_info: {
            first_class_relations: [
              {
                content_type_id: 82,
                name: "bbbb",
                pk: "293",
              },
              {
                content_type_id: 82,
                name: "fact",
                pk: "289"
              }
            ]
          },
          total_comment: 10,
          total_note: 10,
          flag: true
        }
      ],
      totals: 3,
      next: null,
    }
  }
}

async function addWitness({ idParams, body }) {
  // const result = await post(
  //   `/api/matters/${idParams.matterId}/testimonies/`,
  //   body
  // );
  // return mapObjectResult2(result);
  return body;
}

async function updateWitness({ idParams, body }) {
  // const bodyMap = {
  //   ...body
  // };
  // if (body.legal_counsels) {
  //   bodyMap.legal_counsels = body.legal_counsels.map(x => x.id);
  // }
  // if (body.characters) {
  //   bodyMap.characters = body.characters.map(x => x.id);
  // }
  // if (body.deponent) {
  //   bodyMap.deponent = body.deponent.id;
  // }
  // const result = await patch(
  //   `/api/matters/${idParams.matterId}/testimonies/${idParams.witnessId}/`,
  //   bodyMap
  // );
  // return mapObjectResult2(result);
  return body;
}

async function removeWitness({ matterId, witnessId }) {
  // const result = await remove(
  //   `/api/matters/${matterId}/testimonies/${witnessId}/`
  // );
  // return result;
  return witnessId;
}

// relations
async function updateRelationWitness({ idParams, body }) {
  // const bodyMap = {
  //   relations: [
  //     {
  //       content_type_id: body.content_type_id,
  //       object_id: body.pk,
  //       name: body.name,
  //     }
  //   ]
  // }
  // const result = await post(
  //   `/api/matters/${idParams.matterId}/characters/${idParams.characterId}/relations/`,
  //   bodyMap
  // );
  // return result;
}

async function removeRelationWitness(data) {
  // return await remove(`/api/matters/${data.matterId}/characters/${data.characterId}/relations/${data.contentTypeId}/${data.objectId}/`)
}

export default {
  getDataWitness,
  addWitness,
  updateWitness,
  removeWitness,
  //relation
  updateRelationWitness,
  removeRelationWitness
};
