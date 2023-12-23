import api from "@/sat-vue-toolkit/satlegal/api/matter/deposition/RFP";
import {
  getLoadingSlickTable,
  mergeDataLabel,
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";
import {
  NAME_GETTER_DATA_ISSUES,
  NAME_GETTER_DATA_SOURCE,
  NAME_GETTER_DATA_OBJECTION_TYPE
} from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataRFPRequest({ commit, rootGetters }, data = {}) {
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, true)
    );
    const result = await api.getDataRFP(data);

    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listSourceStore = rootGetters[NAME_GETTER_DATA_SOURCE];
    let listSourceMerge = [...rootGetters[NAME_GETTER_DATA_SOURCE]];

    let listObjectionTypeStore = rootGetters[NAME_GETTER_DATA_OBJECTION_TYPE];
    let listObjectionTypeMerge = [
      ...rootGetters[NAME_GETTER_DATA_OBJECTION_TYPE]
    ];

    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.sources) {
          listSourceMerge = mergeDataLabel(x.sources, listSourceMerge);
          result[key].results[i].sources = result[key].results[i].sources.map(
            x => x.pk
          );
        }
        if (x.legal_issues) {
          listIssueMerge = mergeDataLabel(x.legal_issues, listIssueMerge);
          result[key].results[i].legal_issues = result[key].results[
            i
          ].legal_issues.map(x => x.pk);
        }
        if (x.objection_types) {
          listObjectionTypeMerge = mergeDataLabel(
            x.objection_types,
            listObjectionTypeMerge
          );
          result[key].results[i].objection_types = result[key].results[
            i
          ].objection_types.map(x => x.pk);
        }
      });
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, {
        root: true
      });
    }
    if (listSourceMerge.length !== listSourceStore.length) {
      commit("ht_store/matter/source/getDataSource", listSourceMerge, {
        root: true
      });
    }

    if (listObjectionTypeStore.length !== listObjectionTypeMerge.length) {
      commit(
        "ht_store/matter/objectiontype/getDataObjectionType",
        listObjectionTypeMerge,
        { root: true }
      );
    }
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, false)
    );
    result.isFirstCall = data.isFirstCall;
    commit("setDataRFP", result);
    return result;
  },
  async getPreparationRFPDetailRequest({ commit, rootGetters }, idParams) {
    const result = await api.getDataRFPDetail(idParams);
    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listSourceStore = rootGetters[NAME_GETTER_DATA_SOURCE];
    let listSourceMerge = [...rootGetters[NAME_GETTER_DATA_SOURCE]];

    let listObjectionTypeStore = rootGetters[NAME_GETTER_DATA_OBJECTION_TYPE];
    let listObjectionTypeMerge = [
      ...rootGetters[NAME_GETTER_DATA_OBJECTION_TYPE]
    ];

    if (result.sources) {
      listSourceMerge = mergeDataLabel(result.sources, listSourceMerge);
      result.sources = result.sources.map(
        x => x.pk
      );
    }
    if (result.legal_issues) {
      listIssueMerge = mergeDataLabel(result.legal_issues, listIssueMerge);
      result.legal_issues = result.legal_issues.map(x => x.pk);
    }
    if (result.objection_types) {
      listObjectionTypeMerge = mergeDataLabel(
        result.objection_types,
        listObjectionTypeMerge
      );
      result.objection_types = result.objection_types.map(x => x.pk);
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, {
        root: true
      });
    }
    if (listSourceMerge.length !== listSourceStore.length) {
      commit("ht_store/matter/source/getDataSource", listSourceMerge, {
        root: true
      });
    }

    if (listObjectionTypeStore.length !== listObjectionTypeMerge.length) {
      commit(
        "ht_store/matter/objectiontype/getDataObjectionType",
        listObjectionTypeMerge,
        { root: true }
      );
    }
    commit("setDataRFPDetail", result)
    return result
  },
  async addRFPRequest({ commit }, data = {}) {
    const result = await api.addRFP(data);
    commit("addDataRFP", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updateRFPRequest({ commit }, data) {
    api.updateRFP(data);
    const map = {
      result: { id: data.idParams.RFPId, ...data.body }
    };
    commit("updateDataRFP", map);
    if (data.detail) {
      commit("updateDataRFPDetail", map);
    }
  },
  async removeRFPRequest({ commit }, data) {
    const result = await api.removeRFP(data);
    commit("removeDataRFP", data);
    return result;
  },
  // attachment
  async addAttachmentRFPRequest({ commit }, data = {}) {
    const result = await api.addAttachmentRFP(data);
    commit("addDataAttachmentInRFP", {
      requestForProductionId: data.idParams.requestForProductionId,
      attachment: result
    });
    if (data.detail) {
      commit("addAttachmentDetail", result);
    }
    commit("addDataAttachment", result);
    return result;
  },

  async updateAttachmentRFPRequest({ commit }, data = {}) {
    const result = await api.updateAttachmentRFP(data);
    commit("updateDataAttachmentInRFP", {
      requestForProductionId: data.idParams.requestForProductionId,
      attachment: result
    });
    commit("updateDataAttachment", {
      attachmentId: data.idParams.attachmentId,
      result
    });
    if (data.detail) {
      commit("updateDataAttachmentDetail", {
        attachmentId: data.idParams.attachmentId,
        result
      });
    }
    return result;
  },

  async removeAttachmentRFPRequest({ commit }, data) {
    const result = api.removeAttachmentRFP(data);
    commit("removeDataAttachmentInRFP", {
      requestForProductionId: data.requestForProductionId,
      attachmentId: data.attachmentId
    });
    commit("removeDataAttachment", data.attachmentId);
    if (data.detail) {
      commit("removeDataAttachmentDetail", data.attachmentId);
    }
    return result;
  },

  //notes
  async getDataNotesRFPRequest({ commit }, data = {}) {
    const result = await api.getNotesRFP(data);
    commit("getDataNotesRFP", result);
    return result;
  },

  async addNotesRFPRequest({ commit }, data = {}) {
    const result = await api.addNotesRFP(data);
    const map = {
      result: {
        id: data.idParams.RFPId,
        note_count: data.totalNotes
      }
    };
    commit("updateDataRFP", map);
    if (data.detail) {
      commit("updateDataRFPDetail", map);
    }
    return result;
  },

  async updateNotesRFPRequest(_, data = {}) {
    const result = await api.updateNotesRFP(data);
    return result;
  },

  async removeNotesRFPRequest({ commit }, data) {
    const result = await api.removeNotesRFP(data);
    const map = {
      result: {
        id: data.RFPId,
        note_count: data.totalNotes
      }
    };
    commit("updateDataRFP", map);
    if (data.detail) {
      commit("updateDataRFPDetail", map);
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
    commit("updateDataRFP", {
      result: {
        id: data.idParams.rowId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataRFPDetail", {
        result: {
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
    commit("updateDataRFP", {
      result: {
        id: data.rowId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataRFPDetail", {
        result: {
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
    commit("updateDataRFP", {
      result: {
        id: data.rowId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataRFPDetail", {
        result: {
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
    commit("updateDataRFP", {
      result: {
        id: data.idParams.rowId,
        comment_count: data.totalComments
      }
    });
    if (data.detail) {
      commit("updateDataRFPDetail", {
        result: {
          id: data.rowId,
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
  }
};
