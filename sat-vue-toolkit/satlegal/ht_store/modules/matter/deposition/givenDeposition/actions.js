import api from "@/sat-vue-toolkit/satlegal/api/matter/deposition/givenDeposition";
import {
  getLoadingSlickTable,
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";

export default {
  async getDataFromApi({ commit }, data = {}) {
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, true)
    );
    const result = await api.getDataFromApi(data);
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, false)
    );
    let goals = [];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.goals) {
          x.goals.forEach(s => {
            if (!goals.some(s1 => s1.pk === s.pk)) {
              goals.push(s);
            }
            return;
          });
          result[key].results[i].goals = result[key].results[i].goals.map(
            x => x.pk
          );
        }
      });
    }
    result.isFirstCall = data.isFirstCall;
    commit("ht_store/matter/goals/getDataGoals", goals, { root: true });
    commit("setDataMutation", result);
    return result;
  },
  async getDataGivenDetailRequest({ commit }, data = {}) {
    const result = await api.getDataFromApiDetail(data);
    let goals = [];
    if (result.goals) {
      result.goals.forEach(s => {
        if (!goals.some(s1 => s1.pk === s.pk)) {
          goals.push(s);
        }
        return;
      });
      result.goals = result.goals.map(
        x => x.pk
      );
    }
    commit("ht_store/matter/goals/getDataGoals", goals, { root: true });
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
    if (data.detail) {
      commit("updateDataMutationsDetail", map);
    }
    commit("updateDataMutations", map);
  },
  async removeRequestApi({ commit }, data) {
    const result = await api.removeRequestApi(data);
    commit("removeDataMutations", data);
    return result;
  },
  //notes
  async getNotes({ commit }, data = {}) {
    const result = await api.getNotes(data);
    commit("getNotes", result);
    return result;
  },

  async addNotes({ commit }, data = {}) {
    const result = await api.addNotes(data);
    const map = {
      result: {
        pk: data.idParams.rowId,
        note_count: data.totalNotes + 1
      }
    };
    commit("updateDataMutations", map);
    if (data.detail) {
      commit("updateDataMutationsDetail", map);
    }
    return result;
  },

  async updateNotes(_, data = {}) {
    const result = await api.updateNotes(data);
    return result;
  },

  async removeNotes({ commit }, data) {
    const result = await api.removeNotes(data);
    const map = {
      result: {
        pk: data.rowId,
        note_count: data.totalNotes - 1
      }
    };
    commit("updateDataMutations", map);
    if (data.detail) {
      commit("updateDataMutationsDetail", map);
    }
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
    commit("updateDataMutations", {
      result: {
        pk: data.idParams.rowId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataMutationsDetail", {
        result: {
          pk: data.idParams.rowId,
          comment_count: data.totalComments
        }
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
    commit("updateDataMutations", {
      result: {
        pk: data.rowId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataMutationsDetail", {
        result: {
          pk: data.rowId,
          comment_count: data.totalComments
        }
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
    commit("updateDataMutations", {
      result: {
        pk: data.rowId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataMutationsDetail", {
        result: {
          pk: data.rowId,
          comment_count: data.totalComments
        }
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
    commit("updateDataMutations", {
      result: {
        pk: data.idParams.rowId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataMutationsDetail", {
        result: {
          pk: data.idParams.rowId,
          comment_count: data.totalComments
        }
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
  async addAttachmentRequest({ commit }, data = {}) {
    const result = await api.addAttachment(data);
    commit("addDataAttachmentIn", {
      requestForProductionId: data.idParams.requestForProductionId,
      attachment: result,
      detail: data.detail
    });
    commit("addDataAttachment", result);
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
