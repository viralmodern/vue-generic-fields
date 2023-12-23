import api from "@/sat-vue-toolkit/satlegal/api/matter/deposition/information";
import {
  defaultDataActionComment,
  mergeDataLabel,
  defaultDataActionCommentFeedback,
  getLoadingSlickTable
} from "@/sat-vue-toolkit/satlegal/utils";
import {
  NAME_GETTER_DATA_LABELS
} from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataInfoRequest({ commit, rootGetters }, data = {}) {
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, true)
    );
    const result = await api.getDataInfo(data);

    let listLabelStore = rootGetters[NAME_GETTER_DATA_LABELS];
    let listLabelMerge = [
      ...rootGetters[NAME_GETTER_DATA_LABELS]
    ];

    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.labels) {
          listLabelMerge = mergeDataLabel(
            x.labels,
            listLabelMerge
          );
          result[key].results[i].labels = result[key].results[
            i
          ].labels.map(x => x.pk);
        }
      });
    }
    if (listLabelStore.length !== listLabelMerge.length) {
      commit(
        "ht_store/matter/labels/getDataLabels",
        listLabelMerge,
        { root: true }
      );
    }
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, false)
    );
    result.isFirstCall = data.isFirstCall;
    commit("setDataInfo", result);
    return result;
  },
  async getDataInformationDetailRequest({ commit, rootGetters }, data = {}) {
    const result = await api.getDataInfoDetail(data);
    let listLabelStore = rootGetters[NAME_GETTER_DATA_LABELS];
    let listLabelMerge = [
      ...rootGetters[NAME_GETTER_DATA_LABELS]
    ];
    if (result.labels) {
      listLabelMerge = mergeDataLabel(
        result.labels,
        listLabelMerge
      );
      result.labels = result.labels.map(x => x.pk);
    }
    if (listLabelStore.length !== listLabelMerge.length) {
      commit(
        "ht_store/matter/labels/getDataLabels",
        listLabelMerge,
        { root: true }
      );
    }
    commit("setDataInfoDetail", result);
    return result;
  },
  async updateInfoRequest({ commit }, data) {
    api.updateDataInfo(data);
    const map = {
      result: { id: data.idParams.InfoId, ...data.body }
    };
    commit("updateDataInfo", map);
    if (data.detail) {
      commit("updateDataInfoDetail", map);
    }
  },
  async addInfoRequest({ commit }, data = {}) {
    const result = await api.addDataInfo(data);
    commit("addDataInfo", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async removeInfoRequest({ commit }, data) {
    const result = await api.removeDataInfo(data);
    commit("removeDataInfo", data);
    return result;
  },
  // attachment
  async addAttachmentInfoRequest({ commit }, data = {}) {
    const result = await api.addAttachmentInfo(data);
    commit("addDataAttachmentInInfo", {
      InfoId: data.idParams.InfoId,
      attachment: result,
      detail: data.detail
    });
    commit("adddDataAttachment", result);
    return result;
  },

  async updateAttachmentInfoRequest({ commit }, data = {}) {
    const result = await api.updateAttachmentInfo(data);
    commit("updateDataAttachmentInInfo", {
      InfoId: data.idParams.InfoId,
      attachment: result,
      detail: data.detail
    });
    commit("updateDataAttachment", {
      attachmentId: data.idParams.attachmentId,
      result
    });
    return result;
  },

  async removeAttachmentInfoRequest({ commit }, data) {
    const result = api.removeAttachmentInfo(data);
    commit("removeDataAttachmentInInfo", {
      InfoId: data.InfoId,
      attachmentId: data.attachmentId,
      detail: data.detail
    });
    commit("removeDataAttachment", data.attachmentId);
    return result;
  },
  //notes
  async getDataNotesInfoRequest({ commit }, data = {}) {
    const result = await api.getDataNoteInfo(data);
    commit("getDataNoteInfo", result);
    return result;
  },

  async addNotesInfoRequest({ commit }, data = {}) {
    const result = await api.addNotesInfo(data);
    const map = {
      result: {
        id: data.idParams.InfoId,
        note_count: data.totalNotes
      }
    };
    commit("updateDataInfo", map);
    if (data.detail) {
      commit("updateDataInfoDetail", map);
    }
    return result;
  },

  async updateNotesInfoRequest(_, data = {}) {
    const result = await api.updateNotesInfo(data);
    return result;
  },

  async removeNotesInfoRequest({ commit }, data) {
    const result = await api.removeNotesInfo(data);
    const map = {
      result: {
        id: data.InfoId,
        note_count: data.totalNotes
      }
    };
    commit("updateDataInfo", map);
    if (data.detail) {
      commit("updateDataInfoDetail", map);
    }
    return result;
  },
  //comments
  async getDataCommentInfoRequest({ commit }, data = {}) {
    const result = await api.getDataCommentInfo(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentInfo", result);
    return result;
  },

  async addCommentInfoRequest({ commit }, data = {}) {
    const result = await api.addCommentInfo(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    commit("updateDataInfo", {
      result: {
        id: data.idParams.InfoId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataInfoDetail", {
        result: {
          id: data.idParams.InfoId,
          comment_count: data.totalComments
        }
      });
    }
    commit("addCommentInfo", result);
    return result;
  },

  async updateCommentInfoRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentInfo(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentInfo", result);
    return result;
  },

  async removeCommentInfoRequest({ commit }, data = {}) {
    const result = api.removeCommentInfo(data);
    commit("removeCommentInfo", data.commentId);
    commit("updateDataInfo", {
      result: {
        id: data.InfoId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataInfoDetail", {
        result: {
          id: data.InfoId,
          comment_count: data.totalComments
        }
      });
    }
    return result;
  },

  async removeCommentFeedbackInfoRequest({ commit }, data = {}) {
    const result = api.removeCommentInfo(data);
    commit("removeCommentFeedbackInfo", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    commit("updateDataInfo", {
      result: {
        id: data.InfoId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataInfoDetail", {
        result: {
          id: data.idParams.InfoId,
          comment_count: data.totalComments
        }
      });
    }
    commit("updateChildCountCommentInfo", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackInfoRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentInfo(data);
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
    commit("getDataCommentFeedbackInfo", result);
    return result;
  },

  async addCommentFeedbackInfoRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentInfo(data);
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
    commit("updateChildCountCommentInfo", comment);
    commit("updateDataInfo", {
      result: {
        id: data.idParams.InfoId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataInfoDetail", {
        result: {
          id: data.idParams.InfoId,
          comment_count: data.totalComments
        }
      });
    }
    commit("addCommentFeedbackInfo", result);
    return result;
  },

  async updateCommentFeedbackInfoRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentInfo(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackInfo", result);
    return result;
  },
};
