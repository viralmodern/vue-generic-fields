import api from '@/sat-vue-toolkit/satlegal/api/matter/deposition/proceeding';
import { getLoadingSlickTable, mergeDataLabel } from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_GETTER_DATA_SOURCEPROCEEDING, NAME_GETTER_DATA_OBJECTION_TYPE } from "@/sat-vue-toolkit/satlegal/utils/constant";


export default {
  async getDataProceedingRequest({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataProceeding(data);
    let listSourceStore = rootGetters["ht_store/matter/deposition/proceeding"];
    let listSourceMerge = [...rootGetters[NAME_GETTER_DATA_SOURCEPROCEEDING]];
    let listObjectionTypeStore = rootGetters[NAME_GETTER_DATA_OBJECTION_TYPE];
    let listObjectionTypeMerge = [...rootGetters[NAME_GETTER_DATA_OBJECTION_TYPE]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.sources) {
          listSourceMerge = mergeDataLabel(x.sources, listSourceMerge);
          result[key].results[i].sources = result[key].results[i].sources.map(x => x.pk);
        }
        if (x.objection_reasons) {
          listObjectionTypeMerge = mergeDataLabel(x.objection_reasons, listObjectionTypeMerge);
          result[key].results[i].objection_reasons = result[key].results[i].objection_reasons.map(x => x.pk);
        }
      })
    }
    if ((listSourceMerge || []).length !== (listSourceStore || []).length) {
      commit("getDataSource", listSourceMerge)
    }
    if (listObjectionTypeStore.length !== listObjectionTypeMerge.length) {
      commit("ht_store/matter/objectiontype/getDataObjectionType", listObjectionTypeMerge, { root: true });
    }
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    if (data.isConcatData) {
      commit("concatDataProceeding", result);
    } else {
      commit("setDataProceeding", result);
    }
    return result;
  },
  async getProceesdingDetailRequest({ commit, rootGetters }, idParams = {}) {
    const result = await api.getDataProceedingDetail(idParams);
    let listSourceStore = rootGetters["ht_store/matter/deposition/proceeding"];
    let listSourceMerge = [...rootGetters[NAME_GETTER_DATA_SOURCEPROCEEDING]];
    let listObjectionTypeStore = rootGetters[NAME_GETTER_DATA_OBJECTION_TYPE];
    let listObjectionTypeMerge = [...rootGetters[NAME_GETTER_DATA_OBJECTION_TYPE]];

    if (result.sources) {
      listSourceMerge = mergeDataLabel(result.sources, listSourceMerge);
      result.sources = result.sources.map(x => x.pk);
    }
    if (result.objection_reasons) {
      listObjectionTypeMerge = mergeDataLabel(result.objection_reasons, listObjectionTypeMerge);
      result.objection_reasons = result.objection_reasons.map(x => x.pk);
    }
    if ((listSourceMerge || []).length !== (listSourceStore || []).length) {
      commit("getDataSource", listSourceMerge)
    }
    if (listObjectionTypeStore.length !== listObjectionTypeMerge.length) {
      commit("ht_store/matter/objectiontype/getDataObjectionType", listObjectionTypeMerge, { root: true });
    }
    commit("setDataProceedingDetail", result);
    return result;
  },
  async addProceedingRequest({ commit }, data = {}) {
    const result = await api.addProceeding(data);
    commit("addDataProceeding", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updateProceedingRequest({ commit }, data) {
    api.updateProceeding(data);
    const map = {
      result: { id: data.idParams.id, ...data.body }
    };
    commit("updateDataProceeding", map);
    if (data.detail) {
      commit("updateDataProceedingDetail", map);
    }
  },
  async removeProceedingRequest({ commit }, data) {
    const result = await api.removeProceeding(data);
    commit("removeDataProceeding", data);
    return result;
  },

  //source
  async getDataSourceRequest({ commit }, data = {}) {
    const result = await api.getDataSource(data);
    commit("getDataSource", result);
    return result;
  },

  async addSourceRequest({ commit }, data = {}) {
    const result = await api.addSourceRequest(data);
    commit("addSource", result);
    return result;
  },

  async updateSourceRequest({ commit }, data = {}) {
    const result = await api.updateSource(data);
    commit("updateSource", result)
    return result;
  },

  async removeSourceRequest({ commit }, data) {
    const result = await api.removeSource(data);
    const map = {
      result: { keyPleadingId: data.keyPleadingId, note_count: data.totalNotes - 1 }
    };
    commit("updateDataKeyPleading", map);
    return result;
  },
  // relations
  async updateRelationProceedingRequest({ commit }, data) {
    api.updateRelationProceeding(data);
    commit("updateDataRelationProceeding", {
      id: data.idParams.proceedingId,
      result: data.body
    });
    if (data.detail) {
      commit("updateDataRelationProceedingDetail", data.body);
    }
  },

  async removeRelationProceedingRequest({ commit }, data) {
    api.removeRelationProceeding(data);
    commit("removeDataRelationProceeding", {
      id: data.proceedingId,
      result: {
        objectId: data.objectId,
        contentTypeId: data.contentTypeId
      }
    });
    if (data.detail) {
      commit("removeDataRelationProceedingDetail", {
        objectId: data.objectId,
        contentTypeId: data.contentTypeId
      });
    }
  },
};
