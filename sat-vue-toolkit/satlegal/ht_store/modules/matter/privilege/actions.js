import api from "../../../../api/matter/privilege";
import {
  getLoadingSlickTable,
  defaultDataActionComment,
  defaultDataActionCommentFeedback,
  mergeDataLabel
} from "@/sat-vue-toolkit/satlegal/utils";
import {
  NAME_GETTER_DATA_ISSUES,
  NAME_GETTER_DATA_TAG,
  NAME_GETTER_DATA_DOCUMENT_LABEL,
  NAME_GETTER_DATA_PRIVILEGE_LABEL,
} from "@/sat-vue-toolkit/satlegal/utils/constant";

import { initDataPrivilegeDetail } from "./state";

export default {
  async getDataPrivilegeRequest({ commit, rootGetters }, data = {}) {
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, true)
    );
    const result = await api.getDataPrivilege(data);
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, false)
    );
    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];

    let listDocumentLabelStore = rootGetters[NAME_GETTER_DATA_DOCUMENT_LABEL];
    let listDocumentLabelMerge = [...rootGetters[NAME_GETTER_DATA_DOCUMENT_LABEL]];

    let listPrivilegeLabelStore = rootGetters[NAME_GETTER_DATA_PRIVILEGE_LABEL];
    let listPrivilegeLabelMerge = [...rootGetters[NAME_GETTER_DATA_PRIVILEGE_LABEL]];

    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.tags) {
          listTagMerge = mergeDataLabel(x.tags, listTagMerge);
          result[key].results[i].tags = result[key].results[i].tags.map(
            x => x.pk
          );
        }
        if (x.issues) {
          listIssueMerge = mergeDataLabel(x.issues, listIssueMerge);
          result[key].results[i].issues = result[key].results[
            i
          ].issues.map(x => x.pk);
        }
        if (x.document_labels) {
          listDocumentLabelMerge = mergeDataLabel(x.document_labels, listDocumentLabelMerge);
          result[key].results[i].document_labels = result[key].results[i].document_labels.map(
            x => x.pk
          );
        }
        if (x.privilege_labels) {
          listPrivilegeLabelMerge = mergeDataLabel(x.privilege_labels, listPrivilegeLabelMerge);
          result[key].results[i].privilege_labels = result[key].results[i].privilege_labels.map(
            x => x.pk
          );
        }
      });
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, {
        root: true
      });
    }
    if (listDocumentLabelMerge.length !== listDocumentLabelStore.length) {
      commit("ht_store/matter/labelDocument/getDataDocumentLabel", listDocumentLabelMerge, {
        root: true
      });
    }
    if (listTagMerge.length !== listTagStore.length) {
      commit("ht_store/matter/tag/getDataTag", listTagMerge, { root: true });
    }
    if (listPrivilegeLabelMerge.length !== listPrivilegeLabelStore.length) {
      commit("ht_store/matter/privilegeLabel/getDataPrivilegeLabel", listPrivilegeLabelMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataPrivilege", result);
    return result;
  },
  async getPrivilegeDetailRequest({ commit, rootGetters }, data = {}) {
    const result = await api.getDataPrivilegeDetail(data);
    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];

    let listDocumentLabelStore = rootGetters[NAME_GETTER_DATA_DOCUMENT_LABEL];
    let listDocumentLabelMerge = [...rootGetters[NAME_GETTER_DATA_DOCUMENT_LABEL]];

    let listPrivilegeLabelStore = rootGetters[NAME_GETTER_DATA_PRIVILEGE_LABEL];
    let listPrivilegeLabelMerge = [...rootGetters[NAME_GETTER_DATA_PRIVILEGE_LABEL]];

    if (result.tags) {
      listTagMerge = mergeDataLabel(result.tags, listTagMerge);
      result.tags = result.tags.map(
        x => x.pk
      );
    }
    if (result.issues) {
      listIssueMerge = mergeDataLabel(result.issues, listIssueMerge);
      result.issues = result.issues.map(x => x.pk);
    }
    if (result.document_labels) {
      listDocumentLabelMerge = mergeDataLabel(result.document_labels, listDocumentLabelMerge);
      result.document_labels = result.document_labels.map(
        x => x.pk
      );
    }
    if (result.privilege_labels) {
      listPrivilegeLabelMerge = mergeDataLabel(result.privilege_labels, listPrivilegeLabelMerge);
      result.privilege_labels = result.privilege_labels.map(
        x => x.pk
      );
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, {
        root: true
      });
    }
    if (listDocumentLabelMerge.length !== listDocumentLabelStore.length) {
      commit("ht_store/matter/labelDocument/getDataDocumentLabel", listDocumentLabelMerge, {
        root: true
      });
    }
    if (listTagMerge.length !== listTagStore.length) {
      commit("ht_store/matter/tag/getDataTag", listTagMerge, { root: true });
    }
    if (listPrivilegeLabelMerge.length !== listPrivilegeLabelStore.length) {
      commit("ht_store/matter/privilegeLabel/getDataPrivilegeLabel", listPrivilegeLabelMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("getDataPrivileDetail", result);
    return result;
  },
  async getRequestItemRequest({ commit }, data = {}) {
    const result = await api.getRequestItem(data);
    commit("setDataRequestItem", result);
    return result;
  },
  async updateAttachmentPrivilegeRequest({ commit }, data = {}) {
    const result = await api.updatePrivilege(data);
    const map = {
      result
    };
    commit("updateDataPrivilege", map);
  },
  async updatePrivilegeDetailAsyncRequest({ commit }, data = {}) {
    const result = await api.updatePrivilege(data);
    const map = {
      result
    };
    commit("setDataPrivileDetail", { document_attachment: result.document_attachment });
    commit("updateDataPrivilege", map);
  },
  async addPrivilegeRequest({ commit }, data = {}) {
    const result = await api.addPrivilege(data);
    commit("addDataPrivilege", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updatePrivilegeDetailRequest({ commit }, data) {
    api.updatePrivilege(data);
    const map = {
      result: { pk: data.idParams.id, ...data.body }
    };
    commit("setDataPrivileDetail", data.body);
    commit("updateDataPrivilege", map);
  },
  async updatePrivilegeRequest({ commit }, data) {
    api.updatePrivilege(data);
    const map = {
      result: { pk: data.idParams.id, ...data.body }
    };
    commit("updateDataPrivilege", map);
  },
  async removePrivilegeRequest({ commit }, data) {
    const result = await api.removePrivilege(data);
    commit("getDataPrivileDetail", { ...initDataPrivilegeDetail });
    commit("removeDataPrivilege", data);
    return result;
  },

  async updateNotesPrivilegeRequest(_, data = {}) {
    const result = await api.updateNotesPrivilege(data);
    return result;
  },

  async removeNotesPrivilegeRequest({ commit }, data) {
    const result = await api.removeNotesPrivilege(data);
    const dataPrivilege = {
      result: {
        pk: data.id,
        total_notes: data.totalNotes
      }
    };
    commit("updateDataPrivilege", dataPrivilege);
    return result;
  },

  //comments
  async getDataCommentPrivilegeRequest({ commit }, data = {}) {
    const result = await api.getDataCommentPrivilege(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentPrivilege", result);
    return result;
  },

  async addCommentPrivilegeRequest({ commit }, data = {}) {
    const result = await api.addCommentPrivilege(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const dataPrivilege = {
      result: {
        pk: data.idParams.id,
        total_comments: data.totalComments
      }
    };
    commit("setDataPrivileDetail", { total_comments: data.totalComments });
    commit("updateDataPrivilege", dataPrivilege);
    commit("addCommentPrivilege", result);
    return result;
  },

  async updateCommentPrivilegeRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentPrivilege(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentPrivilege", result);
    return result;
  },

  async removeCommentPrivilegeRequest({ commit }, data = {}) {
    const result = api.removeCommentPrivilege(data);
    commit("removeCommentPrivilege", data.commentId);
    const dataPrivilege = {
      result: {
        pk: data.id,
        total_comments: data.totalComments
      }
    };
    commit("setDataPrivileDetail", { total_comments: data.totalComments });
    commit("updateDataPrivilege", dataPrivilege);
    return result;
  },

  async removeCommentFeedbackPrivilegeRequest({ commit }, data = {}) {
    const result = api.removeCommentPrivilege(data);
    commit("removeCommentFeedbackPrivilege", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    const dataPrivilege = {
      result: {
        pk: data.id,
        total_comments: data.totalComments
      }
    };
    commit("setDataPrivileDetail", { total_comments: data.totalComments });
    commit("updateDataPrivilege", dataPrivilege);
    commit("updateChildCountCommentPrivilege", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackPrivilegeRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentPrivilege(data);
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
    commit("getDataCommentFeedbackPrivilege", result);
    return result;
  },

  async addCommentFeedbackPrivilegeRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentPrivilege(data);
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
    const dataPrivilege = {
      result: {
        pk: data.idParams.id,
        total_comments: data.totalComments
      }
    };
    commit("setDataPrivileDetail", { total_comments: data.totalComments });
    commit("updateChildCountCommentPrivilege", comment);
    commit("updateDataPrivilege", dataPrivilege);
    commit("addCommentFeedbackPrivilege", result);
    return result;
  },

  async updateCommentFeedbackPrivilegeRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentPrivilege(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackPrivilege", result);
    return result;
  },

  //actor
  async updatePrivilegeActorRequest({ commit }, data) {
    const result = await api.updatePrivilegeActor(data);
    commit("updatePrivilegeActor", {
      id: data.idParams.privilegeId,
      result
    });
    return result;
  },

  async updatePrivilegeDetailActorRequest({ commit }, data) {
    const result = await api.updatePrivilegeActor(data);
    commit("updatePrivilegeDetailActor", result);
    commit("updatePrivilegeActor", {
      id: data.idParams.privilegeId,
      result
    });
    return result;
  },


  async removePrivilegeActorRequest({ commit }, data) {
    const result = await api.removePrivilegeActor(data);
    commit("removePrivilegeActor", {
      id: data.privilegeId,
      actorId: data.actorId
    });
    return result;
  },

  async removePrivilegeDetailActorRequest({ commit }, data) {
    const result = await api.removePrivilegeActor(data);
    commit("removePrivilegeDetailActor", data.actorId);
    commit("removePrivilegeActor", {
      id: data.privilegeId,
      actorId: data.actorId
    });
    return result;
  },

  //Flag
  async updateReportRequest({ commit }, data) {
    const result = await api.updateReport(data);
    const map = {
      result: { pk: data.idParams.rowId, total_reports: result ? 1 : 0, reported_object: result || null }
    };
    commit("updateDataPrivilege", map);
    if (data.detail) {
      commit("setDataPrivileDetail", { pk: data.idParams.rowId, total_reports: result ? 1 : 0, reported_object: result || null })
    }
    return result
  },
};
