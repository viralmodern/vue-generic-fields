import api from '@/sat-vue-toolkit/satlegal/api/matter/deposition/writtenarticl';
import {
  getLoadingSlickTable, defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";

export default {
  async getDataFromApi({ commit }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataFromApi(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    let goals = [];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.goals) {
          x.goals.forEach(s => {
            if (!goals.some(s1 => s1.pk === s.pk)) {
              goals.push(s)
            }
            return
          })
          result[key].results[i].goals = result[key].results[i].goals.map(x => x.pk);
        }
      })
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataMutation", result);
    return result;
  },
  async getDataWrittenArticleDetailRequest({ commit }, data = {}) {
    const result = await api.getDataFromApiDetail(data);
    let goals = [];
    if (result.goals) {
      result.goals.forEach(s => {
        if (!goals.some(s1 => s1.pk === s.pk)) {
          goals.push(s)
        }
        return
      })
      result.goals = result.goals.map(x => x.pk);
    }
    commit("setDataMutationDetail", result);
    return result;
  },
  async addRequestApi({ commit }, data = {}) {
    const result = await api.addRequestApi(data);
    commit("addDataMutation", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updatedRequestApi({ commit }, data) {
    const result = await api.updatedRequestApi(data);
    const map = {
      result: { id: data.idParams.rowId, ...result }
    };
    commit("updateDataMutations", map);
    if (data.detail) {
      commit("updateDataMutationsDetail", map);

    }
  },
  async removeRequestApi({ commit }, data) {
    const result = await api.removeRequestApi(data);
    commit("removeDataMutations", data);
    return result;
  },
  async getDataNotesRequest({ commit }, data = {}) {
    const result = await api.getDataNotes(data);
    commit("getDataNote", result);
    return result;
  },
  async addNotesRequest({ commit }, data = {}) {
    const result = await api.addNotes(data);
    commit("updateNotes", { id: data.idParams.rowId, notes: result, detail: data.detail });
    return result;
  },
  async updateNotesRequest(_, data = {}) {
    const result = await api.updateNotes(data);
    return result;
  },
  async removeNotesRequest({ commit }, data) {
    const result = await api.removeNotes(data);
    commit("removeNotes", { id: data.rowId, noteId: data.noteId, detail: data.detail });
    return result;
  },
  async getDataCommentRequest({ commit }, data = {}) {
    const result = await api.getDataComment(data);
    commit("getDataComment", result);
    return result;
  },
  async addCommentRequest({ commit }, data = {}) {
    const result = await api.addComment(data);
    commit("updateComment", { writtenId: data.idParams.writtenId, comments: result });
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
        id: data.idParams.keyPleadingId,
        comment_count: data.totalComments
      }
    };
    commit("updateDataMutations", dataKeyPleading);
    if (data.detail) {
      commit("updateDataMutationsDetail", dataKeyPleading);
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
        comment_count: data.totalComments
      }
    };
    commit("updateDataMutations", dataKeyPleading);
    if (data.detail) {
      commit("updateDataMutationsDetail", dataKeyPleading);
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
        comment_count: data.totalComments
      }
    };
    commit("updateDataMutations", dataKeyPleading);
    if (data.detail) {
      commit("updateDataMutationsDetail", dataKeyPleading);
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
        comment_count: data.totalComments
      }
    };
    commit("updateChildCountCommentKeyPleading", comment);
    commit("updateDataMutations", dataKeyPleading);
    if (data.detail) {
      commit("updateDataMutationsDetail", dataKeyPleading);
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
  // attachment
  async addAttachmentRequest({ commit }, data = {}) {
    const result = await api.addAttachment(data);
    commit("addDataAttachmentIn", {
      requestForProductionId: data.idParams.requestForProductionId,
      attachment: result,
      detail: data.detail
    });
    commit("adddDataAttachment", result);
    return result;
  },

  async updateAttachmentRequest({ commit }, data = {}) {
    const result = await api.updateAttachment(data);
    commit("updateDataAttachmentIn", {
      requestForProductionId: data.idParams.requestForProductionId,
      attachment: result,
      detail: data.detail
    });
    commit("updateDataAttachment", {
      attachmentId: data.idParams.attachmentId,
      result,
    });
    return result;
  },

  async removeAttachmentRequest({ commit }, data) {
    const result = api.removeAttachment(data);
    commit("removeDataAttachmentIn", {
      requestForProductionId: data.requestForProductionId,
      attachmentId: data.attachmentId,
      detail: data.detail
    });
    commit("removeDataAttachment", data.attachmentId);
    return result;
  },
};
