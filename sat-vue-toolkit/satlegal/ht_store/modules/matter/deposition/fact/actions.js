import api from '@/sat-vue-toolkit/satlegal/api/matter/deposition/fact';
import { getLoadingSlickTable, mergeDataLabel } from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_GETTER_DATA_SUBJECTS, NAME_GETTER_DATA_ISSUES, NAME_GETTER_DATA_SOURCE, NAME_GETTER_DATA_TAG } from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataFactsRequest({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataFacts(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));

    let listSubjectStore = rootGetters[NAME_GETTER_DATA_SUBJECTS];
    let listSubjectMerge = [...rootGetters[NAME_GETTER_DATA_SUBJECTS]];

    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listSourceStore = rootGetters[NAME_GETTER_DATA_SOURCE];
    let listSourceMerge = [...rootGetters[NAME_GETTER_DATA_SOURCE]];;

    let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.subjects) {
          listSubjectMerge = mergeDataLabel(x.subjects, listSubjectMerge);
          result[key].results[i].subjects = result[key].results[i].subjects.map(x => x.pk);
        }
        if (x.tags) {
          listTagMerge = mergeDataLabel(x.tags, listTagMerge);
          result[key].results[i].tags = result[key].results[i].tags.map(x => x.pk);
        }
        if (x.legal_issues) {
          listIssueMerge = mergeDataLabel(x.legal_issues, listIssueMerge);
          result[key].results[i].legal_issues = result[key].results[i].legal_issues.map(x => x.pk);
        }
        if (x.sources) {
          listSourceMerge = mergeDataLabel(x.sources, listSourceMerge);
          result[key].results[i].sources = result[key].results[i].sources.map(x => x.pk);
        }
      })
    }
    if (listSubjectMerge.length !== listSubjectStore.length) {
      commit("ht_store/matter/subjects/getDataSubjects", listSubjectMerge, { root: true });
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, { root: true });
    }
    if (listSourceMerge.length !== listSourceStore.length) {
      commit("ht_store/matter/source/getDataSource", listSourceMerge, { root: true });
    }
    if (listTagMerge.length !== listTagStore.length) {
      commit("ht_store/matter/tag/getDataTag", listTagMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataFacts", result);
    return result;
  },
  async addFactsRequest({ commit }, data = {}) {
    const result = await api.addFacts(data);
    commit("addDataFacts", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updateFactsRequest({ commit }, data) {
    api.updateFacts(data);
    const map = {
      result: { id: data.idParams.factsId, ...data.body }
    };
    commit("updateDataFacts", map);
  },
  async removeFactsRequest({ commit }, data) {
    const result = await api.removeFacts(data);
    commit("removeDataFacts", data);
    return result;
  },
  async getFactDetailRequest({ commit }, data) {
    commit("setLoadingGetDetail", true);
    const result = await api.getFactDetail(data);
    commit("getFactDetail", result);
    commit("setLoadingGetDetail", false);
    return result;
  },
  async updateFactDetailRequest({ commit }, data) {
    const result = await api.updateFactDetail(data);
    commit("getFactDetail", result);
    commit("updateDataFacts", { result });
    return result;
  },
};
