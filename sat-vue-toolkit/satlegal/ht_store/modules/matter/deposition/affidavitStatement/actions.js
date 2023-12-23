import api from '@/sat-vue-toolkit/satlegal/api/matter/deposition/affidavitStatement';
import { getLoadingSlickTable, mergeDataLabel, defaultDataActionCommentFeedback, defaultDataActionComment } from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_GETTER_DATA_ISSUES } from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataFromApi({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataFromApi(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.legal_issues) {
          listIssueMerge = mergeDataLabel(x.legal_issues, listIssueMerge);
          result[key].results[i].legal_issues = result[key].results[i].legal_issues.map(x => x.pk);
        }
      })
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataPleading", result);
    return result;
  },
  async getAffidavitStatementDetailRequest({ commit, rootGetters }, data = {}) {
    const result = await api.getDataDetailFromApi(data);
    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];
    if (result.legal_issues) {
      listIssueMerge = mergeDataLabel(result.legal_issues, listIssueMerge);
      result.legal_issues = result.legal_issues.map(x => x.pk);
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, { root: true });
    }
    commit("setDataAffDetail", result);
    return result;
  },
  async addKeyRequest({ commit }, data = {}) {
    const result = await api.addKeyPleading(data);
    commit("addDataKeyPleading", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updateKeyPleadingRequest({ commit }, data) {
    api.updateKeyPleading(data);
    const map = {
      result: { id: data.idParams.affId, ...data.body }
    };
    commit("updateDataKeyPleading", map);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", map);
    }
  },
  async updateMakeByRequest({ commit }, data) {
    const results = await api.updateKeyPleading(data);
    const map = {
      result: { id: data.idParams.affId, ...results }
    };
    commit("updateDataKeyPleading", map);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", map);
    }
  },
  async removeKeyPleadingRequest({ commit }, data) {
    const result = await api.removeKeyPleading(data);
    commit("removeDataKeyPleading", data);
    return result;
  },
  //comments
  async getDataCommentKeyPleadingRequest({ commit }, data = {}) {
    const result = await api.getDataCommentKeyPleading(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentKeyPleading", result);
    return result;
  },

  async addCommentKeyPleadingRequest({ commit }, data = {}) {
    const result = await api.addCommentKeyPleading(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const dataKeyPleading = {
      result: {
        id: data.idParams.id,
        total_comments: data.totalComments
      }
    };
    commit("updateDataKeyPleading", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", dataKeyPleading);
    }
    commit("addCommentKeyPleading", result);
    return result;
  },

  async updateCommentKeyPleadingRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentKeyPleading(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentKeyPleading", result);
    return result;
  },

  async removeCommentKeyPleadingRequest({ commit }, data = {}) {
    const result = api.removeCommentKeyPleading(data);
    commit("removeCommentKeyPleading", data.commentId);
    const dataKeyPleading = {
      result: {
        id: data.id,
        total_comments: data.totalComments
      }
    };
    commit("updateDataKeyPleading", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", dataKeyPleading);
    }
    return result;
  },

  async removeCommentFeedbackKeyPleadingRequest({ commit }, data = {}) {
    const result = api.removeCommentKeyPleading(data);
    commit("removeCommentFeedbackKeyPleading", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    const dataKeyPleading = {
      result: {
        id: data.id,
        total_comments: data.totalComments
      }
    };
    commit("updateDataKeyPleading", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", dataKeyPleading);
    }
    commit("updateChildCountCommentKeyPleading", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackKeyPleadingRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentKeyPleading(data);
    const actionCommentFeedback = {};
    result.results.forEach(x => {
      actionCommentFeedback[x.pk] = {
        ...defaultDataActionCommentFeedback
      };
    });
    commit("setActionCommentFeedback", actionCommentFeedback);
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: false,
        isShowFeedback: true,
        isCallApi: true,
        page: data.query.page
      }
    });
    commit("getDataCommentFeedbackKeyPleading", result);
    return result;
  },

  async addCommentFeedbackKeyPleadingRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentKeyPleading(data);
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: false
      }
    });
    commit("setActionCommentFeedback", {
      [result.pk]: {
        ...defaultDataActionCommentFeedback
      }
    });
    const comment = {
      commentId: data.idParams.parentId,
      calculation(number) {
        return number + 1;
      }
    }
    const dataKeyPleading = {
      result: {
        id: data.idParams.id,
        total_comments: data.totalComments
      }
    };
    commit("updateChildCountCommentKeyPleading", comment);
    commit("updateDataKeyPleading", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", dataKeyPleading);
    }
    commit("addCommentFeedbackKeyPleading", result);
    return result;
  },

  async updateCommentFeedbackKeyPleadingRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentKeyPleading(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackKeyPleading", result);
    return result;
  },
};
