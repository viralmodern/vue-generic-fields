import api from "@/sat-vue-toolkit/satlegal/api/clients/document-request";
import { defaultDataActionCommentFeedback, defaultDataActionComment } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  async getDocumentRequest({ commit }, data = {}) {
    commit("setLoading", true);
    const result = await api.getDataDocument(data);
    result.isFirstCall = data.isFirstCall;
    commit("getDataDocument", result);
    commit("setLoading", false);
    return result;
  },
  async postDocumentRequest({ commit }, data) {
    const result = await api.postDocument(data);
    commit("postDocument", result);
    return result;
  },
  async updateDocumentRequest({ commit }, data) {
    const result = api.updateDocument(data);
    commit("updateDocument", {
      pk: data.idParams.pk,
      body: data.body
    });
    return result;
  },
  async removeDocumentRequest({ commit }, data) {
    const result = await api.removeDocument(data);
    commit("removeDocument", data.pk);
    return result;
  },

  //comments
  async getDataCommentDocumentRequest({ commit }, data = {}) {
    const result = await api.getDataCommentDocument(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentDocument", result);
    return result;
  },

  async addCommentDocumentRequest({ commit }, data = {}) {
    const result = await api.addCommentDocument(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const dataDocument = {
      pk: data.idParams.id,
      body: {
        total_comments: data.totalComments
      }
    };
    commit("updateDocument", dataDocument);
    commit("addCommentDocument", result);
    return result;
  },

  async updateCommentDocumentRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentDocument(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentDocument", result);
    return result;
  },

  async removeCommentDocumentRequest({ commit }, data = {}) {
    const result = api.removeCommentDocument(data);
    commit("removeCommentDocument", data.commentId);
    const dataDocument = {
      pk: data.id,
      body: {
        total_comments: data.totalComments
      }
    };
    commit("updateDocument", dataDocument);
    return result;
  },

  async removeCommentFeedbackDocumentRequest({ commit }, data = {}) {
    const result = api.removeCommentDocument(data);
    commit("removeCommentFeedbackDocument", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    const dataDocument = {
      pk: data.id,
      body: {
        total_comments: data.totalComments
      }
    };
    commit("updateDocument", dataDocument);
    commit("updateChildCountCommentDocument", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackDocumentRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentDocument(data);
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
    commit("getDataCommentFeedbackDocument", result);
    return result;
  },

  async addCommentFeedbackDocumentRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentDocument(data);
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
    const dataDocument = {
      pk: data.idParams.id,
      body: {
        total_comments: data.totalComments
      }
    };
    commit("updateChildCountCommentDocument", comment);
    commit("updateDocument", dataDocument);
    commit("addCommentFeedbackDocument", result);
    return result;
  },

  async updateCommentFeedbackDocumentRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentDocument(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackDocument", result);
    return result;
  },
  // attachment
  async addAttachmentRequest({ commit }, data = {}) {
    const result = await api.addAttachment(data);
    commit("addDataAttachmentIn", {
      requestForProductionId: data.idParams.requestForProductionId,
      attachment: result,
    });
    commit("addDataAttachment", result);
    return result;
  },

  async updateAttachmentRequest({ commit }, data = {}) {
    const result = await api.updateAttachment(data);
    commit("updateDataAttachmentIn", {
      requestForProductionId: data.idParams.requestForProductionId,
      attachment: result,
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
    });
    commit("removeDataAttachment", data.attachmentId);
    return result;
  },

};
