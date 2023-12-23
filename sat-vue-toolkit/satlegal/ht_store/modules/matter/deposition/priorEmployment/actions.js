import api from "@/sat-vue-toolkit/satlegal/api/matter/deposition/priorEmployment";
import {
  getLoadingSlickTable,
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";

export default {
  async getDataPriorEmploymentRequest({ commit }, data = {}) {
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, true)
    );
    const result = await api.getDataPriorEmployment(data);
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
    commit("ht_store/matter/goals/getDataGoals", goals, { root: true });
    result.isFirstCall = data.isFirstCall;
    commit("setDataPriorEmployment", result);
    return result;
  },
  async getDataPriorEmploymentDetailRequest({ commit }, data = {}) {
    const result = await api.getDataPriorEmploymentDetail(data);
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
    commit("setDataPriorEmploymentDetail", result);
    return result;
  },
  async addPriorEmploymentRequest({ commit }, data = {}) {
    const result = await api.addPriorEmployment(data);
    commit("addDataPriorEmployment", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updatePriorEmploymentRequest({ commit }, data) {
    api.updatePriorEmployment(data);
    const map = {
      pk: data.idParams.priorEmploymentId,
      ...data.body
    };
    commit("updateDataPriorEmployment", map);
    if (data.detail) {
      commit("updateDataPriorEmploymentDetail", map);
    }
  },
  async updatePriorEmploymentAsyncRequest({ commit }, data) {
    const result = await api.updatePriorEmployment(data);
    const map = {
      pk: data.idParams.priorEmploymentId,
      attachment: result.attachment
    };
    commit("updateDataPriorEmployment", map);
    if (data.detail) {
      commit("updateDataPriorEmploymentDetail", map);
    }
  },
  async removePriorEmploymentRequest({ commit }, data) {
    const result = await api.removePriorEmployment(data);
    commit("removeDataPriorEmployment", data);
    return result;
  },
  //notes
  async getDataNotesPriorEmploymentRequest({ commit }, data = {}) {
    const result = await api.getDataNotesPriorEmployment(data);
    commit("getDataNotePriorEmployment", result);
    return result;
  },

  async addNotesPriorEmploymentRequest({ commit }, data = {}) {
    const result = await api.addNotesPriorEmployment(data);
    const dataPriorEmployment = {
      pk: data.idParams.priorEmploymentId,
      total_notes: data.totalNotes
    };
    commit("updateDataPriorEmployment", dataPriorEmployment);
    if (data.detail) {
      commit("updateDataPriorEmploymentDetail", dataPriorEmployment);
    }
    return result;
  },

  async updateNotesPriorEmploymentRequest(_, data = {}) {
    const result = await api.updateNotesPriorEmployment(data);
    return result;
  },

  async removeNotesPriorEmploymentRequest({ commit }, data) {
    const result = await api.removeNotesPriorEmployment(data);
    const dataPriorEmployment = {
      pk: data.priorEmploymentId,
      total_notes: data.totalNotes
    };
    commit("updateDataPriorEmployment", dataPriorEmployment);
    if (data.detail) {
      commit("updateDataPriorEmploymentDetail", dataPriorEmployment);
    }
    return result;
  },

  //comments
  async getDataCommentPriorEmploymentRequest({ commit }, data = {}) {
    const result = await api.getDataCommentPriorEmployment(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentPriorEmployment", result);
    return result;
  },

  async addCommentPriorEmploymentRequest({ commit }, data = {}) {
    const result = await api.addCommentPriorEmployment(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const dataPriorEmployment = {
      pk: data.idParams.priorEmploymentId,
      total_comments: data.totalComments
    };
    commit("updateDataPriorEmployment", dataPriorEmployment);
    if (data.detail) {
      commit("updateDataPriorEmploymentDetail", dataPriorEmployment);
    }
    commit("addCommentPriorEmployment", result);
    return result;
  },

  async updateCommentPriorEmploymentRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentPriorEmployment(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentPriorEmployment", result);
    return result;
  },

  async removeCommentPriorEmploymentRequest({ commit }, data = {}) {
    const result = api.removeCommentPriorEmployment(data);
    commit("removeCommentPriorEmployment", data.commentId);
    const dataPriorEmployment = {
      pk: data.priorEmploymentId,
      total_comments: data.totalComments
    };
    commit("updateDataPriorEmployment", dataPriorEmployment);
    if (data.detail) {
      commit("updateDataPriorEmploymentDetail", dataPriorEmployment);
    }
    return result;
  },

  async removeCommentFeedbackPriorEmploymentRequest({ commit }, data = {}) {
    const result = api.removeCommentPriorEmployment(data);
    commit("removeCommentFeedbackPriorEmployment", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    };
    const dataPriorEmployment = {
      pk: data.priorEmploymentId,
      total_comments: data.totalComments
    };
    commit("updateDataPriorEmployment", dataPriorEmployment);
    if (data.detail) {
      commit("updateDataPriorEmploymentDetail", dataPriorEmployment);
    }
    commit("updateChildCountCommentPriorEmployment", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackPriorEmploymentRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentPriorEmployment(data);
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
    commit("getDataCommentFeedbackPriorEmployment", result);
    return result;
  },

  async addCommentFeedbackPriorEmploymentRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentPriorEmployment(data);
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
    const dataPriorEmployment = {
      pk: data.idParams.priorEmploymentId,
      total_comments: data.totalComments
    };
    commit("updateChildCountCommentPriorEmployment", comment);
    commit("updateDataPriorEmployment", dataPriorEmployment);
    if (data.detail) {
      commit("updateDataPriorEmploymentDetail", dataPriorEmployment);
    }
    commit("addCommentFeedbackPriorEmployment", result);
    return result;
  },

  async updateCommentFeedbackPriorEmploymentRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentPriorEmployment(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackPriorEmployment", result);
    return result;
  }
};
