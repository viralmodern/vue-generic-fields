import api from "@/sat-vue-toolkit/satlegal/api/matter/deposition/published";
import {
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";

export default {
  async getPublishedRequest({ commit }, data = {}) {
    commit("setLoading", true);
    const result = await api.getDataPublisheds(data);
    result.isFirstCall = data.isFirstCall;
    commit("getPublisheds", result);
    commit("setLoading", false);
    return result;
  },

  async getDataPublishedDetailRequest({ commit }, data = {}) {
    const result = await api.getDataPublishedDetail(data);
    commit("getPublishedDetail", result);
    return result;
  },
  async addPublishedRequest({ commit }, data) {
    const result = await api.addDataPublisheds(data);
    commit("addDataPublisheds", result);
    return result;
  },
  async updatePublishedRequest({ commit }, data) {
    const result = api.updateDataPublisheds(data);
    commit("updateDataPublisheds", {
      id: data.idParams.rowId,
      body: data.body
    });
    if (data.detail) {
      commit("updateDataPublishedDetail", data.body);
    }
    return result;
  },
  async removePublishedRequest({ commit }, data) {
    const result = await api.removeDataPublisheds(data);
    commit("removeDataPublisheds", data.rowId);
    return result;
  },
  //note
  async getDataNotesPublishedRequest({ commit }, data = {}) {
    const result = await api.getNotesPublished(data);
    commit("getDataNotePublished", result);
    return result;
  },

  async addNotesPublishedRequest({ commit }, data = {}) {
    const result = await api.addNotesPublished(data);
    const map = {
      draftId: data.idParams.pubId,
      body: {
        note_count: data.totalNotes + 1
      }
    };
    commit("updateDataPublisheds", map);
    if (data.detail) {
      commit("updateDataPublishedDetail", {
        note_count: data.totalNotes + 1
      });
    }
    return result;
  },
  async removeNotesPublishedRequest({ commit }, data) {
    const result = await api.removeNotesPublished(data);
    const map = {
      draftId: data.pubId,
      body: {
        note_count: data.totalNotes - 1
      }
    };
    commit("updateDataPublisheds", map);
    if (data.detail) {
      commit("updateDataPublishedDetail", {
        note_count: data.totalNotes - 1
      });
    }
    return result;
  },
  async updateNotesPublishedRequest(_, data = {}) {
    const result = await api.updateNotesPublished(data);
    return result;
  },
  //comments
  async getDataComment({ commit }, data = {}) {
    const result = await api.getComments(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataComment", result);
    return result;
  },

  async addComment({ commit }, data = {}) {
    const result = await api.addComments(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    commit("updateDataPublisheds", {
      id: data.idParams.rowId,
      body: {
        total_comments: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataPublishedDetail", {
        total_comments: data.totalComments
      });
    }
    commit("addComment", result);
    return result;
  },

  async updateComment({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.patchComments(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateComment", result);
    return result;
  },

  async removeComment({ commit }, data = {}) {
    const result = api.removeComments(data);
    commit("removeComment", data.commentId);
    commit("updateDataPublisheds", {
      id: data.rowId,
      body: {
        total_comments: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataPublishedDetail", {
        total_comments: data.totalComments
      });
    }
    return result;
  },

  async removeCommentFeedback({ commit }, data = {}) {
    const result = api.removeComments(data);
    commit("removeCommentFeedback", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    };
    commit("updateDataPublisheds", {
      id: data.rowId,
      body: {
        total_comments: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataPublishedDetail", {
        total_comments: data.totalComments
      });
    }
    commit("updateChildCountComment", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedback({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getComments(data);
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
    commit("getDataCommentFeedback", result);
    return result;
  },

  async addCommentFeedback({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addComments(data);
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
    };
    commit("updateChildCountComment", comment);
    commit("updateDataPublisheds", {
      id: data.idParams.rowId,
      body: {
        total_comments: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataPublishedDetail", {
        total_comments: data.totalComments
      });
    }
    commit("addCommentFeedback", result);
    return result;
  },

  async updateCommentFeedback({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.patchComments(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedback", result);
    return result;
  },
  // attachment
  async addAttachmentPublishedRequest({ commit }, data = {}) {
    const result = await api.addAttachmentPublished(data);
    commit("addDataAttachmentInPublished", {
      publishedId: data.idParams.publishedId,
      attachment: result,
      detail: data.detail
    });
    commit("adddDataAttachment", result);
    return result;
  },

  async updateAttachmentPublishedRequest({ commit }, data = {}) {
    const result = await api.updateAttachmentPublished(data);
    commit("updateDataAttachmentInPublished", {
      publishedId: data.idParams.publishedId,
      attachment: result,
      detail: data.detail
    });
    commit("updateDataAttachment", {
      attachmentId: data.idParams.attachmentId,
      result
    });
    return result;
  },

  async removeAttachmentPublishedRequest({ commit }, data) {
    const result = api.removeAttachmentPublished(data);
    commit("removeDataAttachmentInPublished", {
      publishedId: data.publishedId,
      attachmentId: data.attachmentId,
      detail: data.detail
    });
    commit("removeDataAttachment", data.attachmentId);
    return result;
  },
};
