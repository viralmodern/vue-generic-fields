import api from '@/sat-vue-toolkit/satlegal/api/matter/deposition/draftsPrepare';
import {
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";

export default {
  async getDraftsRequest({ commit }, data = {}) {
    commit("setLoading", true);
    const result = await api.getDataDrafts(data);
    result.isFirstCall = data.isFirstCall;
    commit("getDrafts", result);
    commit("setLoading", false);
    return result;
  },
  async getDataDraftPrepareDetailRequest({ commit }, data = {}) {
    const result = await api.getDataDraftsDetail(data);
    commit("getDataDraftsDetail", result);
    return result;
  },
  async updateDraftsRequest({ commit }, data) {
    const result = api.updateDataDrafts(data);
    commit("updateDataDrafts", {
      id: data.idParams.rowId,
      body: data.body
    });
    if (data.detail) {
      commit("updateDataDraftsDetail", data.body);
    }
    return result;
  },
  async addDraftsRequest({ commit }, data) {
    const result = await api.addDataDrafts(data);
    commit("addDataDrafts", result);
    return result;
  },
  async removeDraftsRequest({ commit }, data) {
    const result = await api.removeDataDrafts(data);
    commit("removeDataDrafts", data.rowId);
    return result;
  },
  //notes
  async getDataNotesDraftsRequest({ commit }, data = {}) {
    const result = await api.getDataNoteDrafts(data);
    commit("getDataNoteDrafts", result);
    return result;
  },

  async addNotesDraftsRequest({ commit }, data = {}) {
    const result = await api.addNotesDrafts(data);
    const map = {
      draftId: data.idParams.draftId,
      body: {
        note_count: data.totalNotes + 1
      }
    };
    commit("updateDataDrafts", map);
    if (data.detail) {
      commit("updateDataDraftsDetail", {
        note_count: data.totalNotes + 1
      });
    }
    return result;
  },

  async updateNotesDraftsRequest(_, data = {}) {
    const result = await api.updateNotesDrafts(data);
    return result;
  },

  async removeNotesDraftsRequest({ commit }, data) {
    const result = await api.removeNotesDrafts(data);
    const map = {
      draftId: data.draftId,
      body: {
        note_count: data.totalNotes - 1
      }
    };
    commit("updateDataDrafts", map);
    if (data.detail) {
      commit("updateDataDraftsDetail", {
        note_count: data.totalNotes - 1
      });
    }
    return result;
  },
  //comments
  async getDataCommentDraftsRequest({ commit }, data = {}) {
    const result = await api.getDataCommentDrafts(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentDrafts", result);
    return result;
  },

  async addCommentDraftsRequest({ commit }, data = {}) {
    const result = await api.addCommentDrafts(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const map = {
      draftId: data.idParams.draftId,
      body: {
        comment_count: data.totalComments
      }
    };
    commit("updateDataDrafts", map);
    if (data.detail) {
      commit("updateDataDraftsDetail", {
        comment_count: data.totalComments
      });
    }
    commit("addCommentDrafts", result);
    return result;
  },

  async updateCommentDraftsRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentDrafts(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentDrafts", result);
    return result;
  },

  async removeCommentDraftsRequest({ commit }, data = {}) {
    const result = api.removeCommentDrafts(data);
    commit("removeCommentDrafts", data.commentId);
    const map = {
      draftId: data.draftId,
      body: {
        comment_count: data.totalComments
      }
    };
    commit("updateDataDrafts", map);
    if (data.detail) {
      commit("updateDataDraftsDetail", {
        comment_count: data.totalComments
      });
    }
    return result;
  },

  async removeCommentFeedbackDraftsRequest({ commit }, data = {}) {
    const result = api.removeCommentDrafts(data);
    commit("removeCommentFeedbackDrafts", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    const map = {
      draftId: data.draftId,
      body: {
        comment_count: data.totalComments
      }
    };
    commit("updateDataDrafts", map);
    if (data.detail) {
      commit("updateDataDraftsDetail", {
        comment_count: data.totalComments
      });
    }
    commit("updateChildCountCommentDrafts", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackDraftsRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentDrafts(data);
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
    commit("getDataCommentFeedbackDrafts", result);
    return result;
  },

  async addCommentFeedbackDraftsRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentDrafts(data);
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
    const map = {
      draftId: data.idParams.draftId,
      body: {
        comment_count: data.totalComments
      }
    };
    commit("updateChildCountCommentDrafts", comment);
    commit("updateDataDrafts", map);
    if (data.detail) {
      commit("updateDataDraftsDetail", {
        comment_count: data.totalComments
      });
    }
    commit("addCommentFeedbackDrafts", result);
    return result;
  },

  async updateCommentFeedbackDraftsRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentDrafts(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackDrafts", result);
    return result;
  },
  // attachment
  async addAttachmentDraftRequest({ commit }, data = {}) {
    const result = await api.addAttachmentDraft(data);
    commit("addDataAttachmentInDraft", {
      draftId: data.idParams.draftId,
      attachment: result,
      detail: data.detail
    });
    commit("adddDataAttachment", result);
    return result;
  },

  async updateAttachmentDraftRequest({ commit }, data = {}) {
    const result = await api.updateAttachmentDraft(data);
    commit("updateDataAttachmentInDraft", {
      draftId: data.idParams.draftId,
      attachment: result,
      detail: data.detail
    });
    commit("updateDataAttachment", {
      attachmentId: data.idParams.attachmentId,
      result
    });
    return result;
  },

  async removeAttachmentDraftRequest({ commit }, data) {
    const result = api.removeAttachmentDraft(data);
    commit("removeDataAttachmentInDraft", {
      draftId: data.draftId,
      attachmentId: data.attachmentId,
      detail: data.detail
    });
    commit("removeDataAttachment", data.attachmentId);
    return result;
  },
};
