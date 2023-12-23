import apiGet from "../../../../../api/matter/requestStatus/requestSetsDocument";
import api from "../../../../../api/matter/requestStatus/requestSetsItemDocument";

import {
  getLoadingSlickTable,
  defaultDataActionComment,
  defaultDataActionCommentFeedback,
  mergeDataLabel
} from "@/sat-vue-toolkit/satlegal/utils";
import {
  NAME_GETTER_DATA_LABELS,
  NAME_GETTER_DATA_ISSUES,
  NAME_GETTER_DATA_SOURCE,
  NAME_GETTER_DATA_TAG
} from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataRSIDRequest({ commit, rootGetters }, data = {}) {
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, true)
    );
    const result = await apiGet.getDataRSID(data);
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, false)
    );
    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listLabelStore = rootGetters[NAME_GETTER_DATA_LABELS];
    let listLlabelMerge = [...rootGetters[NAME_GETTER_DATA_LABELS]];

    let listSourceStore = rootGetters[NAME_GETTER_DATA_SOURCE];
    let listSourceMerge = [...rootGetters[NAME_GETTER_DATA_SOURCE]];

    let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.tags) {
          listTagMerge = mergeDataLabel(x.tags, listTagMerge);
          result[key].results[i].tags = result[key].results[i].tags.map(
            x => x.pk
          );
        }
        if (x.legal_issues) {
          listIssueMerge = mergeDataLabel(x.legal_issues, listIssueMerge);
          result[key].results[i].legal_issues = result[key].results[
            i
          ].legal_issues.map(x => x.pk);
        }
        if (x.labels) {
          listLlabelMerge = mergeDataLabel(x.labels, listLlabelMerge);
          result[key].results[i].labels = result[key].results[
            i
          ].labels.map(x => x.pk);
        }
        if (x.sources) {
          listSourceMerge = mergeDataLabel(x.sources, listSourceMerge);
          result[key].results[i].sources = result[key].results[i].sources.map(
            x => x.pk
          );
        }
      });
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, {
        root: true
      });
    }
    if (listSourceMerge.length !== listSourceStore.length) {
      commit("ht_store/matter/source/getDataSource", listSourceMerge, {
        root: true
      });
    }
    if (listTagMerge.length !== listTagStore.length) {
      commit("ht_store/matter/tag/getDataTag", listTagMerge, { root: true });
    }
    if (listLlabelMerge.length !== listLabelStore.length) {
      commit("ht_store/matter/labels/getDataLabels", listLlabelMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataRSID", result);
    return result;
  },
  async getRequestItemRequest({ commit }, data = {}) {
    const result = await api.getRequestItem(data);
    commit("setDataRequestItem", result);
    return result;
  },
  async updateAttachmentRSIDRequest({ commit }, data = {}) {
    const result = await api.updateRSID(data);
    const map = {
      result
    };
    if (data.detail) {
      commit("updateDataRSIDDetail", map);
    }
    commit("updateDataRSID", map);
  },
  async getDocumentDetailRequest({ commit, rootGetters }, idParams) {
    const result = await apiGet.getDocumentDetail(idParams);
    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listLabelStore = rootGetters[NAME_GETTER_DATA_LABELS];
    let listLlabelMerge = [...rootGetters[NAME_GETTER_DATA_LABELS]];

    let listSourceStore = rootGetters[NAME_GETTER_DATA_SOURCE];
    let listSourceMerge = [...rootGetters[NAME_GETTER_DATA_SOURCE]];

    let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];
    if (result.tags) {
      listTagMerge = mergeDataLabel(result.tags, listTagMerge);
      result.tags = result.tags.map(
        x => x.pk
      );
    }
    if (result.legal_issues) {
      listIssueMerge = mergeDataLabel(result.legal_issues, listIssueMerge);
      result.legal_issues = result.legal_issues.map(x => x.pk);
    }
    if (result.labels) {
      listLlabelMerge = mergeDataLabel(result.labels, listLlabelMerge);
      result.labels = result.labels.map(x => x.pk);
    }
    if (result.sources) {
      listSourceMerge = mergeDataLabel(result.sources, listSourceMerge);
      result.sources = result.sources.map(
        x => x.pk
      );
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, {
        root: true
      });
    }
    if (listSourceMerge.length !== listSourceStore.length) {
      commit("ht_store/matter/source/getDataSource", listSourceMerge, {
        root: true
      });
    }
    if (listTagMerge.length !== listTagStore.length) {
      commit("ht_store/matter/tag/getDataTag", listTagMerge, { root: true });
    }
    if (listLlabelMerge.length !== listLabelStore.length) {
      commit("ht_store/matter/labels/getDataLabels", listLlabelMerge, { root: true });
    }
    commit("setDocumentDetail", result)
    return result
  },
  async addRSIDRequest({ commit }, data = {}) {
    const result = await api.addRSID(data);
    commit("addDataRSID", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updateRSIDRequest({ commit }, { idParams, body, detail = false }) {
    api.updateRSID({ idParams, body });
    const map = {
      result: { pk: idParams.id, ...body }
    };
    commit("updateDataRSID", map);
    if (detail) {
      commit("updateDataRSIDDetail", map);
    }
  },
  async removeRSIDRequest({ commit }, data) {
    const result = await api.removeRSID(data);
    commit("removeDataRSID", data);
    return result;
  },

  //notes
  async getDataNotesRSIDRequest({ commit }, data = {}) {
    const result = await api.getDataNotesRSID(data);
    commit("getDataNoteRSID", result);
    return result;
  },

  async addNotesRSIDRequest({ commit }, data = {}) {
    const result = await api.addNotesRSID(data);
    const dataRSID = {
      result: {
        pk: data.idParams.id,
        total_notes: data.totalNotes
      }
    };
    commit("updateDataRSID", dataRSID);
    return result;
  },

  async updateNotesRSIDRequest(_, data = {}) {
    const result = await api.updateNotesRSID(data);
    return result;
  },

  async removeNotesRSIDRequest({ commit }, data) {
    const result = await api.removeNotesRSID(data);
    const dataRSID = {
      result: {
        pk: data.id,
        total_notes: data.totalNotes
      }
    };
    commit("updateDataRSID", dataRSID);
    return result;
  },

  //comments
  async getDataCommentRSIDRequest({ commit }, data = {}) {
    const result = await api.getDataCommentRSID(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentRSID", result);
    return result;
  },

  async addCommentRSIDRequest({ commit }, data = {}) {
    const result = await api.addCommentRSID(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const dataRSID = {
      result: {
        pk: data.idParams.id,
        total_comments: data.totalComments
      }
    };
    if (data.detail) {
      commit("updateDataRSIDDetail", dataRSID);
    }
    commit("updateDataRSID", dataRSID);
    commit("addCommentRSID", result);
    return result;
  },

  async updateCommentRSIDRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentRSID(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentRSID", result);
    return result;
  },

  async removeCommentRSIDRequest({ commit }, data = {}) {
    const result = api.removeCommentRSID(data);
    commit("removeCommentRSID", data.commentId);
    const dataRSID = {
      result: {
        pk: data.id,
        total_comments: data.totalComments
      }
    };
    commit("updateDataRSID", dataRSID);
    if (data.detail) {
      commit("updateDataRSIDDetail", dataRSID);
    }
    return result;
  },

  async removeCommentFeedbackRSIDRequest({ commit }, data = {}) {
    const result = api.removeCommentRSID(data);
    commit("removeCommentFeedbackRSID", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    const dataRSID = {
      result: {
        pk: data.id,
        total_comments: data.totalComments
      }
    };
    commit("updateDataRSID", dataRSID);
    if (data.detail) {
      commit("updateDataRSIDDetail", dataRSID);
    }
    commit("updateChildCountCommentRSID", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackRSIDRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentRSID(data);
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
    commit("getDataCommentFeedbackRSID", result);
    return result;
  },

  async addCommentFeedbackRSIDRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentRSID(data);
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
    const dataRSID = {
      result: {
        pk: data.idParams.id,
        total_comments: data.totalComments
      }
    };
    commit("updateChildCountCommentRSID", comment);
    commit("updateDataRSID", dataRSID);
    if (data.detail) {
      commit("updateDataRSIDDetail", dataRSID);
    }
    commit("addCommentFeedbackRSID", result);
    return result;
  },

  async updateCommentFeedbackRSIDRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentRSID(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackRSID", result);
    return result;
  },
};
