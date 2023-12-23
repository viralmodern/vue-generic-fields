import api from "@/sat-vue-toolkit/satlegal/api/matter/requestStatus/request-set/task";
import {
  getLoadingSlickTable,
  mergeDataLabel,
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";
import {
  NAME_GETTER_DATA_LABELS,
  NAME_GETTER_DATA_ISSUES
} from "@/sat-vue-toolkit/satlegal/utils/constant";


export default {
  async getDataRequestSetTaskRequest({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataRequestSetTask(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    let listLabelStore = rootGetters[NAME_GETTER_DATA_LABELS];
    let listLabelMerge = [...rootGetters[NAME_GETTER_DATA_LABELS]];
    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.labels) {
          listLabelMerge= mergeDataLabel(x.labels, listLabelMerge);
          result[key].results[i].labels = result[key].results[i].labels.map(x => x.pk);
        }
        if (x.legal_issues) {
          listIssueMerge = mergeDataLabel(x.legal_issues, listIssueMerge);
          result[key].results[i].legal_issues = result[key].results[i].legal_issues.map(x => x.pk);
        }
      })
    }
    if (listLabelMerge.length !== listLabelStore.length) {
      commit("ht_store/matter/labels/getDataLabels", listLabelMerge, { root: true });
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataRequestSetTask", result);
    return result;
  },

  async addRequestSetTaskRequest({ commit }, data = {}) {
    const result = await api.addRequestSetTask(data);
    commit("addDataRequestSetTask", { listIdGroup: data.listIdGroup, result });
    return result;
  },

  async updateRequestSetTaskRequest({ commit }, data) {
    api.updateRequestSetTask(data);
    const map = {
      result: { pk: data.idParams.requestSetTaskId, ...data.body }
    };
    commit("updateDataRequestSetTask", map);
  },

  async removeRequestSetTaskRequest({ commit }, data) {
    const result = await api.removeRequestSetTask(data);
    commit("removeDataRequestSetTask", data);
    return result;
  },


  //notes
  async getDataNotesRequestSetTaskRequest({ commit }, data = {}) {
    const result = await api.getDataNotesRequestSetTask(data);
    commit("getDataNoteRequestSetTask", result);
    return result;
  },

  async addNotesRequestSetTaskRequest({ commit }, data = {}) {
    const result = await api.addNotesRequestSetTask(data);
    const body = {
      result: {
        total_notes: data.totalNotes + 1,
        pk: data.idParams.requestSetTaskId,
      }
    }
    commit("updateDataRequestSetTask", body);
    return result;
  },

  async updateNotesRequestSetTaskRequest(_, data = {}) {
    const result = await api.updateNotesRequestSetTask(data);
    return result;
  },

  async removeNotesRequestSetTaskRequest({ commit }, data) {
    const result = await api.removeNotesRequestSetTask(data);
    const body = {
      result: {
        total_notes: data.totalNotes - 1,
        pk: data.requestSetTaskId,
      }
    }
    commit("updateDataRequestSetTask", body);
    return result;
  },

  //attachments
  async getDataAttachmentRequestSetTaskRequest({ commit }, data = {}) {
    const result = await api.getDataAttachmentRequestSetTask(data);
    commit("getDataAttachmentRequestSetTask", result);
    return result;
  },

  async addAttachmentRequestSetTaskRequest({ commit }, data = {}) {
    const result = await api.addAttachmentRequestSetTask(data);
    commit("updateAttachmentInRequestSetTask", {requestSetTaskId: data.idParams.requestSetTaskId, attachments: result.attachments});
    return result;
  },

  async updateAttachmentRequestSetTaskRequest(_, data = {}) {
    const result = await api.updateAttachmentRequestSetTask(data);
    return result;
  },

  async removeAttachmentRequestSetTaskRequest({ commit }, data) {
    const result = api.removeAttachmentRequestSetTask(data);
    commit("removeAttachmentInRequestSetTask", {requestSetTaskId: data.requestSetTaskId, attachmentId: data.attachmentId});
    return result;
  },

  //comments
  async getDataCommentRequestSetTaskRequest({ commit }, data = {}) {
    const result = await api.getDataCommentRequestSetTask(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentRequestSetTask", result);
    return result;
  },

  async addCommentRequestSetTaskRequest({ commit }, data = {}) {
    const result = await api.addCommentRequestSetTask(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const dataRequestSetTask = {
      result: {
        pk: data.idParams.requestSetTaskId,
        total_comments: data.totalComments
      }
    };
    commit("updateDataRequestSetTask", dataRequestSetTask);
    commit("addCommentRequestSetTask", result);
    return result;
  },

  async updateCommentRequestSetTaskRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentRequestSetTask(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentRequestSetTask", result);
    return result;
  },

  async removeCommentRequestSetTaskRequest({ commit }, data = {}) {
    const result = api.removeCommentRequestSetTask(data);
    commit("removeCommentRequestSetTask", data.commentId);
    const dataRequestSetTask = {
      result: {
        pk: data.requestSetTaskId,
        total_comments: data.totalComments
      }
    };
    commit("updateDataRequestSetTask", dataRequestSetTask);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackRequestSetTaskRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentRequestSetTask(data);
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
    commit("getDataCommentFeedbackRequestSetTask", result);
    return result;
  },

  async addCommentFeedbackRequestSetTaskRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentRequestSetTask(data);
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
    const dataRequestSetTask = {
      result: {
        pk: data.idParams.requestSetTaskId,
        total_comments: data.totalComments
      }
    };
    commit("updateChildCountCommentRequestSetTask", comment);
    commit("updateDataRequestSetTask", dataRequestSetTask);
    commit("addCommentFeedbackRequestSetTask", result);
    return result;
  },

  async updateCommentFeedbackRequestSetTaskRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentRequestSetTask(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackRequestSetTask", result);
    return result;
  },

  async removeCommentFeedbackRequestSetTaskRequest({ commit }, data = {}) {
    const result = api.removeCommentRequestSetTask(data);
    commit("removeCommentFeedbackRequestSetTask", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    const dataRequestSetTask = {
      result: {
        pk: data.requestSetTaskId,
        total_comments: data.totalComments
      }
    };
    commit("updateDataRequestSetTask", dataRequestSetTask);
    commit("updateChildCountCommentRequestSetTask", comment);
    return result;
  },

  // attachment
  async addAttachmentRequestSetTaskRequest({ commit }, data = {}) {
    const result = await api.addAttachmentRequestSetTask(data);
    commit("addDataAttachmentInRequestSetTask", {
      requestSetTaskId: data.idParams.requestSetTaskId,
      attachment: result
    });
    commit("addDataAttachment", result);
    return result;
  },

  async updateAttachmentRequestSetTaskRequest({ commit }, data = {}) {
    const result = await api.updateAttachmentRequestSetTask(data);
    commit("updateDataAttachmentInRequestSetTask", {
      requestSetTaskId: data.idParams.requestSetTaskId,
      attachment: result
    });
    commit("updateDataAttachment", {
      attachmentId: data.idParams.attachmentId,
      result
    });
    return result;
  },

  async removeAttachmentRequestSetTaskRequest({ commit }, data) {
    const result = api.removeAttachmentRequestSetTask(data);
    commit("removeDataAttachmentInRequestSetTask", {
      requestSetTaskId: data.requestSetTaskId,
      attachmentId: data.attachmentId
    });
    commit("removeDataAttachment", data.attachmentId);
    return result;
  },
};
