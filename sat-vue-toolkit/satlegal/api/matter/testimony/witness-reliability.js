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

async function getDataWitnessReliability({ idParams, searchObject = {} }) {
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
          legal_issues: [],
          length_of_time: 1,
          witness_to_the_event: 1,
          observation_impeded: 1,
          observed_known: 1,
          reason_to_remember: "not serious",
          elapsed_since: 1,
          observational_sensivity: [
            {
              id: 1,
              observation_quality: 1,
              sensory_defects: 1,
              general_physical_conditions: "cvbdsdsd",
              observation_condition: 1
            },
            {
              id: 2,
              observation_quality: 1,
              sensory_defects: 1,
              general_physical_conditions: "cvbcvb323",
              observation_condition: 1
            }
          ],
          objectivity: [
            {
              id: 1,
              expectation: 1,
              bias: 1,
              bemory_related: 1,
            },
            {
              id: 2,
              expectation: 1,
              bias: 1,
              bemory_related: 1,
            }
          ],
          competence: [
            {
              id: 1,
              appropriate_source: 1,
              in_position_to_observe: 1,
              understand_of_what_observed: 1,
              ability_to_communicate: 1,
            },
            {
              id: 2,
              appropriate_source: 1,
              in_position_to_observe: 1,
              understand_of_what_observed: 1,
              ability_to_communicate: 1,
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
          legal_issues: [],
          length_of_time: 1,
          witness_to_the_event: 1,
          observation_impeded: 1,
          observed_known: 1,
          reason_to_remember: "not serious",
          elapsed_since: 1,
          observational_sensivity: [
            {
              id: 1,
              observation_quality: 1,
              sensory_defects: 1,
              general_physical_conditions: "cvbdsdsd",
              observation_condition: 1
            },
            {
              id: 2,
              observation_quality: 1,
              sensory_defects: 1,
              general_physical_conditions: "cvbcvb323",
              observation_condition: 1
            }
          ],
          objectivity: [
            {
              id: 1,
              expectation: 1,
              bias: 1,
              bemory_related: 1,
            },
            {
              id: 2,
              expectation: 1,
              bias: 1,
              bemory_related: 1,
            }
          ],
          competence: [
            {
              id: 1,
              appropriate_source: 1,
              in_position_to_observe: 1,
              understand_of_what_observed: 1,
              ability_to_communicate: 1,
            },
            {
              id: 2,
              appropriate_source: 1,
              in_position_to_observe: 1,
              understand_of_what_observed: 1,
              ability_to_communicate: 1,
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
          legal_issues: [],
          length_of_time: 1,
          witness_to_the_event: 1,
          observation_impeded: 1,
          observed_known: 1,
          reason_to_remember: "not serious",
          elapsed_since: 1,
          observational_sensivity: [
            {
              id: 1,
              observation_quality: 1,
              sensory_defects: 1,
              general_physical_conditions: "cvbdsdsd",
              observation_condition: 1
            },
            {
              id: 2,
              observation_quality: 1,
              sensory_defects: 1,
              general_physical_conditions: "cvbcvb323",
              observation_condition: 1
            }
          ],
          objectivity: [
            {
              id: 1,
              expectation: 1,
              bias: 1,
              bemory_related: 1,
            },
            {
              id: 2,
              expectation: 1,
              bias: 1,
              bemory_related: 1,
            }
          ],
          competence: [
            {
              id: 1,
              appropriate_source: 1,
              in_position_to_observe: 1,
              understand_of_what_observed: 1,
              ability_to_communicate: 1,
            },
            {
              id: 2,
              appropriate_source: 1,
              in_position_to_observe: 1,
              understand_of_what_observed: 1,
              ability_to_communicate: 1,
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

async function addWitnessReliability({ idParams, body }) {
  // const result = await post(
  //   `/api/matters/${idParams.matterId}/testimonies/`,
  //   body
  // );
  // return mapObjectResult2(result);
  return {
    ...body,
    legal_issues: [],
    length_of_time: null,
    witness_to_the_event: null,
    observation_impeded: null,
    observed_known: null,
    reason_to_remember: "",
    elapsed_since: null,
    observational_sensivity: [],
    objectivity: [],
    competence: [],
    relations_info: {
      first_class_relations: []
    },
    total_comment: 0,
    total_note: 0,
    flag: true
  };
}

async function updateWitnessReliability({ idParams, body }) {
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
  //   `/api/matters/${idParams.matterId}/testimonies/${idParams.witnessReliabilityId}/`,
  //   bodyMap
  // );
  // return mapObjectResult2(result);
  return body;
}

async function removeWitnessReliability({ matterId, witnessReliabilityId }) {
  // const result = await remove(
  //   `/api/matters/${matterId}/testimonies/${witnessReliabilityId}/`
  // );
  // return result;
  return witnessReliabilityId;
}

// relations
async function updateRelationWitnessReliability({ idParams, body }) {
  // const bodyMap = {
  //   relations: [
  //     {
  //       content_type_id: body.content_type_id,
  //       object_id: body.pk,
          // Do not post name
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

async function removeRelationWitnessReliability(data) {
  // return await remove(`/api/matters/${data.matterId}/characters/${data.characterId}/relations/${data.contentTypeId}/${data.objectId}/`)
}

export default {
  getDataWitnessReliability,
  addWitnessReliability,
  updateWitnessReliability,
  removeWitnessReliability,
  //relation
  updateRelationWitnessReliability,
  removeRelationWitnessReliability
};
