import api from '@/sat-vue-toolkit/satlegal/api/matter/risk/register';
import {
  getLoadingSlickTable,
  mergeDataLabel,
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";
import {
  NAME_GETTER_DATA_TAG,
  NAME_GETTER_DATA_ISSUES,
  NAME_GETTER_DATA_RISKAREA,
  NAME_GETTER_DATA_RISKSOURCE
} from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataRiskRequest({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataRisk(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));

    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listRiskAreaStore = rootGetters[NAME_GETTER_DATA_RISKAREA];
    let listRiskAreaMerge = [...rootGetters[NAME_GETTER_DATA_RISKAREA]];

    let listRiskSourceStore = rootGetters[NAME_GETTER_DATA_RISKSOURCE];
    let listRiskSourceMerge = [...rootGetters[NAME_GETTER_DATA_RISKSOURCE]];

    let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];

    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.tags) {
          listTagMerge = mergeDataLabel(x.tags, listTagMerge);
          result[key].results[i].tags = result[key].results[i].tags.map(x => x.pk);
        }
        if (x.legal_issues) {
          listIssueMerge = mergeDataLabel(x.legal_issues, listIssueMerge);
          result[key].results[i].legal_issues = result[key].results[i].legal_issues.map(x => x.pk);
        }
        if (x.risk_areas) {
          listRiskAreaMerge = mergeDataLabel(x.risk_areas, listRiskAreaMerge);
          result[key].results[i].risk_areas = result[key].results[i].risk_areas.map(x => x.pk);
        }
        if (x.risk_sources) {
          listRiskSourceMerge = mergeDataLabel(x.risk_sources, listRiskSourceMerge);
          result[key].results[i].risk_sources = result[key].results[i].risk_sources.map(x => x.pk);
        }
      })
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, { root: true });
    }
    if (listRiskAreaMerge.length !== listRiskAreaStore.length) {
      commit("ht_store/matter/riskAreas/getDataRiskArea", listRiskAreaMerge, { root: true });
    }
    if (listRiskSourceMerge.length !== listRiskSourceStore.length) {
      commit("ht_store/matter/riskSource/getDataRiskSource", listRiskSourceMerge, { root: true });
    }
    if (listTagMerge.length !== listTagStore.length) {
      commit("ht_store/matter/tag/getDataTag", listTagMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataRisk", result);
    return result;
  },
  async getAllDataRiskNoGroupRequest({ commit }, data = {}) {
    const result = await api.getAllDataRiskNoGroup(data);
    commit("setAllDataRiskNoGroup", result);
    return result;
  },
  async getAllDataRiskRequest({ commit }, data = {}) {
    const result = await api.getAllDataRisk(data);
    commit("setAllDataRisk", result);
    return result;
  },

  async addRiskRequest({ commit }, data = {}) {
    const result = await api.addRisk(data);
    commit("addDataRisk", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async addRiskNoGroupByRequest({ commit }, data = {}) {
    const result = await api.addRisk(data);
    commit("addRiskNoGroupBy", result);
    return result;
  },
  async updateRiskRequest({ commit }, data) {
    api.updateRisk(data);
    const map = {
      result: { id: data.idParams.riskId, ...data.body }
    };
    commit("updateDataRisk", map);
    if (data.detail) {
      commit("getRiskDetail", { ...data.body });
    }
  },
  async updateRiskAsyncRequest({ commit }, data) {
    const result = await api.updateRisk(data);
    const map = {
      result: { id: data.idParams.riskId, ...result }
    };
    commit("updateDataRisk", map);
    return result;
  },

  async removeRiskRequest({ commit }, data) {
    const result = await api.removeRisk(data);
    commit("removeDataRisk", data);
    return result;
  },
  //note
  async getDataNotesRiskRequest({ commit }, data = {}) {
    const result = await api.getDataNotesRisk(data);
    commit("getDataNoteRisk", result);
    return result;
  },
  async addNotesRiskRequest({ commit }, data = {}) {
    const result = await api.addNotesRisk(data);
    const dataNote = {
      result: {
        id: data.idParams.riskId,
        total_notes: data.totalNotes
      }
    };
    commit("updateDataRisk", dataNote);
    if (data.detail) {
      commit("getRiskDetail", {
        total_notes: data.totalNotes
      });
    }
    return result;
  },
  async removeNotesRiskRequest({ commit }, data) {
    const result = api.removeNotesRisk(data);
    const dataNote = {
      result: {
        id: data.riskId,
        total_notes: data.totalNotes
      }
    };
    commit("updateDataRisk", dataNote);
    if (data.detail) {
      commit("getRiskDetail", {
        total_notes: data.totalNotes
      });
    }
    return result;
  },

  async updateNotesRiskRequest(_, data = {}) {
    const result = await api.updateNotesRisk(data);
    return result;
  },
  //detail
  async getRiskDetailRequest({ commit }, data) {
    const result = await api.getRiskDetail(data);
    if (result.tags) {
      result.tags = (result.tags || []).map(x => x.pk);
    }
    if (result.legal_issues) {
      result.legal_issues = (result.legal_issues || []).map(x => x.pk);
    }
    if (result.risk_areas) {
      result.risk_areas = (result.risk_areas || []).map(x => x.pk);
    }
    if (result.risk_sources) {
      result.risk_sources = (result.risk_sources || []).map(x => x.pk);
    }
    commit("getRiskDetail", result);
    return result;
  },
  async updateRiskDetailRequest({ commit }, data) {
    const result = await api.updateRiskDetail(data);
    commit("getRiskDetail", result);
    commit("updateDataRisk", { result: { ...result, id: result.pk } });
    return result;
  },
  // histories
  async getHistoriesRisks({ commit }, payload) {
    const result = await api.getHistoriesRisks(payload);
    commit("getHistoriesRisks", { ...result, type: payload.type });
    return result;
  },
  async postHistoriesRisks({ commit }, payload) {
    const result = await api.postHistoriesRisks(payload);
    commit("setLoadingHistories", true);
    commit("postHistoriesRisks", result);
    commit("setLoadingHistories", false);
    return result;
  },
  async patchHistoriesRisks({ commit }, payload) {
    const result = await api.patchHistoriesRisks(payload);
    commit("patchHistoriesRisks", result);
    return result;
  },
  async deleteHistoriesRisks({ commit }, payload) {
    const result = await api.deleteHistoriesRisks(payload);
    commit("deleteHistoriesRisks", payload);
    return result;
  },

  //comments
  async getDataCommentHistoryRequest({ commit }, data = {}) {
    const result = await api.getDataCommentHistory(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentHistory", result);
    return result;
  },

  async addCommentHistoryRequest({ commit }, data = {}) {
    const result = await api.addCommentHistory(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const dataHistory = {
      pk: data.idParams.historyId,
      total_comments: data.totalComments
    };
    commit("patchHistoriesRisks", dataHistory);
    commit("addCommentHistory", result);
    return result;
  },

  async updateCommentHistoryRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentHistory(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentHistory", result);
    return result;
  },

  async removeCommentHistoryRequest({ commit }, data = {}) {
    const result = api.removeCommentHistory(data);
    commit("removeCommentHistory", data.commentId);
    const dataHistory = {
      pk: data.historyId,
      total_comments: data.totalComments
    };
    commit("patchHistoriesRisks", dataHistory);
    return result;
  },

  async removeCommentFeedbackHistoryRequest({ commit }, data = {}) {
    const result = api.removeCommentHistory(data);
    commit("removeCommentFeedbackHistory", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    const dataHistory = {
      pk: data.historyId,
      total_comments: data.totalComments
    };
    commit("patchHistoriesRisks", dataHistory);
    commit("updateChildCountCommentHistory", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackHistoryRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentHistory(data);
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
    commit("getDataCommentFeedbackHistory", result);
    return result;
  },

  async addCommentFeedbackHistoryRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentHistory(data);
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
    const dataHistory = {
      pk: data.idParams.historyId,
      total_comments: data.totalComments
    };
    commit("updateChildCountCommentHistory", comment);
    commit("patchHistoriesRisks", dataHistory);
    commit("addCommentFeedbackHistory", result);
    return result;
  },

  async updateCommentFeedbackHistoryRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentHistory(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackHistory", result);
    return result;
  },

  // relations
  async updateRelationRiskRequest({ commit }, data) {
    api.updateRelationRisk(data);
    commit("updateDataRelationRisk", {
      id: data.idParams.riskId,
      result: data.body
    });
  },

  async removeRelationRiskRequest({ commit }, data) {
    api.removeRelationRisk(data);
    commit("removeDataRelationRisk", {
      id: data.riskId,
      result: {
        objectId: data.objectId,
        contentTypeId: data.contentTypeId
      }
    });
  },

  // attachment
  async addAttachmentRiskRequest({ commit }, data = {}) {
    const result = await api.addAttachmentRisk(data);
    commit("addDataAttachmentInRisk", {
      riskId: data.idParams.riskId,
      attachment: result,
      detail: data.detail
    });
    commit("addDataAttachment", result);
    return result;
  },

  async updateAttachmentRiskRequest({ commit }, data = {}) {
    const result = await api.updateAttachmentRisk(data);
    commit("updateDataAttachmentInRisk", {
      riskId: data.idParams.riskId,
      attachment: result,
      detail: data.detail
    });
    commit("updateDataAttachment", {
      attachmentId: data.idParams.attachmentId,
      result
    });
    return result;
  },

  async removeAttachmentRiskRequest({ commit }, data) {
    const result = api.removeAttachmentRisk(data);
    commit("removeDataAttachmentInRisk", {
      riskId: data.riskId,
      attachmentId: data.attachmentId,
      detail: data.detail
    });
    commit("removeDataAttachment", data.attachmentId);
    return result;
  },

};
