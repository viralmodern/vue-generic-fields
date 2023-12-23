import api from "../../../../../api/matter/requestStatus/requestSet";
import { mergeDataLabel } from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_GETTER_DATA_ISSUES } from "@/sat-vue-toolkit/satlegal/utils/constant";


export default {
  async getDataFromApi({ commit, rootGetters }, payload = {}) {
    commit("setLoading", true);
    const result = await api.getDataFromApi(payload);
    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.legal_issues) {
          listIssueMerge = mergeDataLabel(x.legal_issues, listIssueMerge);
          result[key].results[i].legal_issues = result[key].results[i].legal_issues.map(x => x.pk);
        }
        result[key].results[i].request_to = (result[key].results[i].request_to && result[key].results[i].request_to.pk)
      })
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, { root: true });
    }
    result.isFirstCall = payload.isFirstCall;
    commit("getDataFromApi", result);
    commit("setLoading", false);
    return result;
  },
  async addRequestApi({ commit }, payload = {}) {
    const result = await api.addRequestApi(payload);
    commit("addRequestApi", { payload, result: { ...result, request_to: (result.request_to && result.request_to.pk) } });
    return result;
  },
  async patchRequestApi({ commit }, payload) {
    api.patchRequestApi(payload);
    const map = {
      result: { id: payload.idParams.rowId, ...payload.body }
    };
    commit("patchRequestApi", map);
  },
  async removeRequestApi({ commit }, payload) {
    const result = await api.removeRequestApi(payload);
    commit("removeRequestApi", payload);
    return result;
  },
  async updateReportRequest({ commit }, data) {
    const result = await api.updateReport(data);
    const map = {
      result: { id: data.idParams.rowId, total_reports: result ? 1 : 0, reported_object: result || null  }
    };
    commit("patchRequestApi", map);
    return result
  },
};
