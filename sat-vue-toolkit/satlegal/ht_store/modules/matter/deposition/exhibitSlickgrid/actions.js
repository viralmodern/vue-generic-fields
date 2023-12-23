import api from '@/sat-vue-toolkit/satlegal/api/matter/deposition/exhibitSlickgrid';
import {
  getLoadingSlickTable, mergeDataLabel, defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_GETTER_DATA_ISSUES } from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataKeyExhibitRequest({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataKeyExhibit(data);
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
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, {
        root: true
      });
    }
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    result.isFirstCall = data.isFirstCall;
    commit("setDataKeyExhibit", result);
    return result;
  },
  async getDataKeyExhibitDetailRequest({ commit, rootGetters }, data = {}) {
    const result = await api.getDataKeyExhibitDetail(data);
    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];
    if (result.labels) {
      listIssueMerge = mergeDataLabel(result.labels, listIssueMerge);
      result.labels = result.labels.map(x => x.pk);
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, {
        root: true
      });
    }
    commit("setDataKeyExhibitDetail", result);
    return result;
  },
  async addKeyExhibitRequest({ commit }, data = {}) {
    const result = await api.addKeyExhibit(data);
    result.labels = result.labels.map(x => x.pk);
    commit("addDataKeyExhibit", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updateKeyExhibitRequest({ commit }, data) {
    api.updateKeyExhibit(data);
    const map = {
      result: { id: data.idParams.keyExhibitId, ...data.body }
    };
    if (data.detail) {
      commit("updateDataKeyExhibitDetail", map);
    }
    commit("updateDataKeyExhibit", map);
  },
  async removeKeyExhibitRequest({ commit }, data) {
    const result = await api.removeKeyExhibit(data);
    commit("removeDataKeyExhibit", data);
    return result;
  },
  async updateExhibitsAsyncRequest({ commit }, data) {
    const result = await api.updateKeyExhibit(data);
    const map = {
      result: { id: result.pk, attachment: result.attachment }
    };
    commit("updateDataKeyExhibit", map);
    if (data.detail) {
      commit("updateDataKeyExhibitDetail", map);
    }
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
        id: data.idParams.keyPleadingId,
        total_comments: data.totalComments
      }
    };
    commit("updateDataKeyExhibit", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyExhibitDetail", dataKeyPleading);
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
        id: data.keyPleadingId,
        total_comments: data.totalComments
      }
    };
    commit("updateDataKeyExhibit", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyExhibitDetail", dataKeyPleading);
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
        id: data.keyPleadingId,
        total_comments: data.totalComments
      }
    };
    commit("updateDataKeyExhibit", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyExhibitDetail", dataKeyPleading);
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
        id: data.idParams.keyPleadingId,
        total_comments: data.totalComments
      }
    };
    commit("updateChildCountCommentKeyPleading", comment);
    commit("updateDataKeyExhibit", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyExhibitDetail", dataKeyPleading);
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
