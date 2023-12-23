import api from "@/sat-vue-toolkit/satlegal/api/matter/deposition/priorExperience";
import {
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";

export default {
  async getDataPriorExperienceRequest({ commit }, data = {}) {
    commit("setLoading", true);
    const result = await api.getDataPriorExperience(data);
    result.isFirstCall = data.isFirstCall;
    commit("getDataPriorExperience", result);
    commit("setLoading", false);
    return result;
  },
  async getDataPriorExperienceDetailRequest({ commit }, data = {}) {
    const result = await api.getDataPriorExperienceDetail(data);
    commit("getDataPriorExperienceDetail", result);
    return result;
  },
  async updatePriorExperienceRequest({ commit }, data) {
    const result = api.updateDataPriorExperience(data);
    const map = {
      result: { priorExperienceId: data.idParams.priorExperienceId, ...data.body }
    };
    commit("updatePriorExperience", map);
    if (data.detail) {
      commit("updatePriorExperienceDetail", map);
    }
    return result;
  },
  async updatePriorExperienceAsyncRequest({ commit }, data) {
    const result = await api.updateDataPriorExperience(data);
    const map = {
      result: {
        priorExperienceId: data.idParams.priorExperienceId,
        attachment: result
      }
    };
    commit("updatePriorExperience", map);
    if (data.detail) {
      commit("updatePriorExperienceDetail", map);
    }
  },
  async addPriorExperienceRequest({ commit }, data) {
    const result = await api.addDataPriorExperience(data);
    commit("addPriorExperience", result);
    return result;
  },
  async removePriorExperienceRequest({ commit }, data) {
    const result = await api.removePriorExperience(data);
    commit("removePriorExperience", data.priorExperienceId);
    return result;
  },

  //notes
  async getDataNotesPriorExperienceRequest({ commit }, data = {}) {
    const result = await api.getDataNotesPriorExperience(data);
    commit("getDataNotePriorExperience", result);
    return result;
  },

  async addNotesPriorExperienceRequest({ commit }, data = {}) {
    const result = await api.addNotesPriorExperience(data);
    const map = {
      result: {
        priorExperienceId: data.idParams.priorExperienceId,
        note_count: data.totalNotes + 1
      }
    };
    commit("updatePriorExperience", map);
    if (data.detail) {
      commit("updatePriorExperienceDetail", map);
    }
    return result;
  },

  async updateNotesPriorExperienceRequest(_, data = {}) {
    const result = await api.updateNotesPriorExperience(data);
    return result;
  },

  async removeNotesPriorExperienceRequest({ commit }, data) {
    const result = await api.removeNotesPriorExperience(data);
    const map = {
      result: {
        priorExperienceId: data.priorExperienceId,
        note_count: data.totalNotes - 1
      }
    };
    commit("updateDataPriorExperience", map);
    if (data.detail) {
      commit("updatePriorExperienceDetail", map);
    }
    return result;
  },

  //comments
  async getDataCommentPriorExperienceRequest({ commit }, data = {}) {
    const result = await api.getDataCommentPriorExperience(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentPriorExperience", result);
    return result;
  },

  async addCommentPriorExperienceRequest({ commit }, data = {}) {
    const result = await api.addCommentPriorExperience(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const dataPriorExperience = {
      result: {
        priorExperienceId: data.idParams.id,
        comment_count: data.totalComments
      }
    };
    commit("updatePriorExperience", dataPriorExperience);
    if (data.detail) {
      commit("updatePriorExperienceDetail", dataPriorExperience);
    }
    commit("addCommentPriorExperience", result);
    return result;
  },

  async updateCommentPriorExperienceRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentPriorExperience(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentPriorExperience", result);
    return result;
  },

  async removeCommentPriorExperienceRequest({ commit }, data = {}) {
    const result = api.removeCommentPriorExperience(data);
    commit("removeCommentPriorExperience", data.commentId);
    const dataPriorExperience = {
      result: {
        priorExperienceId: data.id,
        comment_count: data.totalComments
      }
    };
    commit("updatePriorExperience", dataPriorExperience);
    if (data.detail) {
      commit("updatePriorExperienceDetail", dataPriorExperience);
    }
    return result;
  },

  async removeCommentFeedbackPriorExperienceRequest({ commit }, data = {}) {
    const result = api.removeCommentPriorExperience(data);
    commit("removeCommentFeedbackPriorExperience", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    const dataPriorExperience = {
      result: {
        priorExperienceId: data.id,
        comment_count: data.totalComments
      }
    };
    commit("updatePriorExperience", dataPriorExperience);
    if (data.detail) {
      commit("updatePriorExperienceDetail", dataPriorExperience);
    }
    commit("updateChildCountCommentPriorExperience", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackPriorExperienceRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentPriorExperience(data);
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
    commit("getDataCommentFeedbackPriorExperience", result);
    return result;
  },

  async addCommentFeedbackPriorExperienceRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentPriorExperience(data);
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
    const dataPriorExperience = {
      result: {
        priorExperienceId: data.idParams.id,
        comment_count: data.totalComments
      }
    };
    commit("updateChildCountCommentPriorExperience", comment);
    commit("updatePriorExperience", dataPriorExperience);
    if (data.detail) {
      commit("updatePriorExperienceDetail", dataPriorExperience);
    }
    commit("addCommentFeedbackPriorExperience", result);
    return result;
  },

  async updateCommentFeedbackPriorExperienceRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentPriorExperience(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackPriorExperience", result);
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
