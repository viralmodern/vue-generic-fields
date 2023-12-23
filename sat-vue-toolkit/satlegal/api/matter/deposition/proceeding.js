import { get, post, patch, remove } from "../../base";
import { formatQuery } from "@/sat-vue-toolkit/satlegal/utils";

const mapResultGetProceeding = data => {
  return data.map(x => {
    if (!x.relations_info) {
      // không thấy api trả về nên hard
      x.relations_info = {
        total_relations: 0,
        total_first_class_relations: 0,
        first_class_relations: []
      }
    }
    return {
      ...x,
      id: x.pk,
    }
  })
}

async function getDataProceeding({ idParams, searchObject = {} }) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/proceedings/`;
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
      const results = mapResultGetProceeding(result[key].results);
      result[key] = {
        pk: +key,
        results,
        totals: result[key].count || 0,
        next: result[key].next
      };
    }
    return { ...group, ...result };
  }
  return {
    all: {
      pk: "all",
      results: mapResultGetProceeding(result.results),
      totals: result.count,
      next: result.next
    }
  };
}

async function getDataProceedingDetail(idParams) {
  const url = `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/proceedings/${idParams.id}/`;
  const result = await get(url);
  if (!result.relations_info) {
    // không thấy api trả về nên hard
    result.relations_info = {
      total_relations: 0,
      total_first_class_relations: 0,
      first_class_relations: []
    }
  }
  return {
    ...result, id: result.pk,
  }
}
  async function addProceeding({ idParams, body }) {
    const result = await post(
      `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/proceedings/`,
      body
    );
    if (!result.relations_info) {
      // không thấy api trả về nên hard
      result.relations_info = {
        total_relations: 0,
        total_first_class_relations: 0,
        first_class_relations: []
      }
    }
    return {
      ...result,
      id: result.pk,
      bookmarked_pk: !!result.bookmarked_pk,
    };
  }

  async function updateProceeding({ idParams, body }) {
    const result = await patch(
      `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/proceedings/${idParams.id}/`,
      body
    );
    return result;
  }

  async function removeProceeding({ matterId, depositionId, id }) {
    const result = await remove(
      `/api/matters/${matterId}/depositions/${depositionId}/proceedings/${id}/`
    );
    return result;
  }

  // notes
  async function getDataSource({ matterId }) {
    const url = `/api/matters/${matterId}/tagables/?type=proceeding-source`;
    const result = await get(url);
    return result.map(x => ({
      ...x,
      color: "#" + x.color,
    }))
  }

  async function addSourceRequest(payload) {
    const bodyMap = {
      name: payload.name,
      color: (payload.color).substr(1, 6),
      type: "proceeding-source"
    }
    const url = `/api/matters/${payload.matterId}/tagables/`;
    const result = await post(url, bodyMap);
    result.color = "#" + result.color;
    return result;
  }

  async function updateSource(payload) {
    const bodyMap = {
      name: payload.name,
      color: payload.color.substr(1, 6)
    }
    const url = `/api/matters/${payload.matterId}/tagables/${payload.pk}/`;
    const result = await patch(url, bodyMap);
    return result;
  }

  async function removeSource({
    matterId,
    depositionId,
    id,
    noteId
  }) {
    const url = `/api/matters/${matterId}/depositions/${depositionId}/proceedings/${id}/notes/${noteId}/`;
    const result = await remove(url);
    return result;
  }
  // relations
  async function updateRelationProceeding({ idParams, body }) {
    const bodyMap = {
      relations: [
        {
          content_type_id: body.content_type_id,
          object_id: body.pk.toString(),
          // name: body.name,
        }
      ]
    }
    const result = await post(
      `/api/matters/${idParams.matterId}/depositions/${idParams.depositionId}/proceedings/${idParams.proceedingId}/relations/`,
      bodyMap
    );
    return result;
  }

  async function removeRelationProceeding(data) {
    return await remove(`/api/matters/${data.matterId}/depositions/${data.depositionId}/proceedings/${data.proceedingId}/relations/${data.contentTypeId}/${data.objectId}/`)
  }

  export default {
    getDataProceeding,
    addProceeding,
    updateProceeding,
    removeProceeding,
    getDataProceedingDetail,
    // source
    getDataSource,
    addSourceRequest,
    updateSource,
    removeSource,
    // relations
    updateRelationProceeding,
    removeRelationProceeding
  };
