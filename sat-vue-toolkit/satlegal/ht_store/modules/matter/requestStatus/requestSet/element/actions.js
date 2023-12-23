import api from "@/sat-vue-toolkit/satlegal/api/matter/requestStatus/request-set/element";
import { mergeDataLabel } from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_GETTER_DATA_ISSUES } from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataRequestSetItemElementRequest({ commit, rootGetters }, data = {}) {
    commit("setLoading", true);
    const result = await api.getDataRequestSetItemElement(data);
    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    result.results.forEach((x, i) => {
      if (x.legal_issues) {
        listIssueMerge = mergeDataLabel(x.legal_issues, listIssueMerge);
        x.legal_issues = x.legal_issues.map(x => x.pk);
      }
    });
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, {
        root: true
      });
    }
    result.isFirstCall = data.isFirstCall;
    commit("getDataRequestSetItemElement", result);
    commit("setLoading", false);
    return result;
  },
  async updateRequestSetItemElementRequest({ commit }, data) {
    const result = api.updateDataRequestSetItemElement(data);
    const map = { pk: data.idParams.requestSetItemElementId, ...data.body };
    commit("updateRequestSetItemElement", map);
    return result;
  },
  async addRequestSetItemElementRequest({ commit }, data) {
    const result = await api.addDataRequestSetItemElement(data);
    commit("addRequestSetItemElement", result);
    return result;
  },
  async removeRequestSetItemElementRequest({ commit }, data) {
    const result = await api.removeRequestSetItemElement(data);
    commit("removeRequestSetItemElement", data.requestSetItemElementId);
    return result;
  },

  // relations
  async updateRelationRequestSetItemElementRequest({ commit }, data) {
    api.updateRelationRequestSetItemElement(data);
    commit("updateDataRelationRequestSetItemElement", {
      pk: data.idParams.requestSetItemElementId,
      result: data.body
    });
  },

  async removeRelationRequestSetItemElementRequest({ commit }, data) {
    api.removeRelationRequestSetItemElement(data);
    commit("removeDataRelationRequestSetItemElement", {
      pk: data.requestSetItemElementId,
      result: {
        objectId: data.objectId,
        contentTypeId: data.contentTypeId
      }
    });
  }
};
