import api from '@/sat-vue-toolkit/satlegal/api/matter/testimony/witness';
import { getLoadingSlickTable, mergeDataLabel } from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_GETTER_DATA_LABELS, NAME_GETTER_DATA_ISSUES} from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataWitnessRequest({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataWitness(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));

    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listLabelStore = rootGetters[NAME_GETTER_DATA_LABELS];
    let listLabelMerge = [...rootGetters[NAME_GETTER_DATA_LABELS]];
    // let sources = [];
    //  let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    //  let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.labels) {
          listLabelMerge= mergeDataLabel(x.labels, listLabelMerge);
          result[key].results[i].labels = result[key].results[i].labels.map(x => x.pk);
        }
        // if (x.tags) {
        //   x.tags.forEach(s => {
        //     if (!tags.some(s1 => s1.pk === s.pk)) {
        //       tags.push(s)
        //     }
        //     return
        //   })
        //   result[key].results[i].tags = result[key].results[i].tags.map(x => x.pk);
        // }
        if (x.legal_issues) {
          listIssueMerge = mergeDataLabel(x.legal_issues, listIssueMerge);
          result[key].results[i].legal_issues = result[key].results[i].legal_issues.map(x => x.pk);
        }
        // if (x.sources) {
        //   x.sources.forEach(s => {
        //     if (!sources.some(s1 => s1.pk === s.pk)) {
        //       sources.push(s)
        //     }
        //     return
        //   })
        //   result[key].results[i].sources = result[key].results[i].sources.map(x => x.pk);
        // }
      })
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, { root: true });
    }
    if (listLabelMerge.length !== listLabelStore.length) {
      commit("ht_store/matter/labels/getDataLabels", listLabelMerge, { root: true });
    }
    // commit("matter/source/getDataSource", sources, { root: true });
    // commit("matter/tag/getDataTag", tags, { root: true });
    result.isFirstCall = data.isFirstCall;
    commit("setDataWitness", result);
    return result;
  },
  async addWitnessRequest({ commit }, data = {}) {
    const result = await api.addWitness(data);
    commit("addDataWitness", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updateWitnessRequest({ commit }, data) {
    api.updateWitness(data);
    const map = {
      result: { pk: data.idParams.witnessId, ...data.body }
    };
    commit("updateDataWitness", map);
  },
  async removeWitnessRequest({ commit }, data) {
    const result = await api.removeWitness(data);
    commit("removeDataWitness", data);
    return result;
  },

  // relations
  async updateRelationWitnessRequest({ commit }, data) {
    api.updateRelationWitness(data);
    commit("updateDataRelationWitness", {
      pk: data.idParams.witnessId,
      result: data.body
    });
  },

  async removeRelationWitnessRequest({ commit }, data) {
    api.removeRelationWitness(data);
    commit("removeDataRelationWitness", {
      pk: data.witnessId,
      result: {
        objectId: data.objectId,
        contentTypeId: data.contentTypeId
      }
    });
  },
};
