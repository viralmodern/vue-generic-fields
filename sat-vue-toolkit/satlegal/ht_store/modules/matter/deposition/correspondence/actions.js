import api from '@/sat-vue-toolkit/satlegal/api/matter/deposition/correspondence';
import { getLoadingSlickTable, mergeDataLabel, defaultDataActionCommentFeedback, defaultDataActionComment } from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_GETTER_DATA_CHARACTER } from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataFromApi({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataFromApi(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));
    let listCharacterStore = rootGetters[NAME_GETTER_DATA_CHARACTER];
    let listCharacterMerge = [...rootGetters[NAME_GETTER_DATA_CHARACTER]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.custodians) {
          listCharacterMerge = mergeDataLabel(x.custodians, listCharacterMerge);
          result[key].results[i].custodians = result[key].results[i].custodians.map(x => x.pk);
        }
      })
    }
    if (listCharacterMerge.length !== listCharacterStore.length) {
      commit("ht_store/matter/character2/setAllDataCharacter", listCharacterMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataMutation", result);
    return result;
  },
  async getDataCorespondenceDetailRequest({ commit, rootGetters }, data = {}) {
    const result = await api.getDataFromApiDetail(data);
    let listCharacterStore = rootGetters[NAME_GETTER_DATA_CHARACTER];
    let listCharacterMerge = [...rootGetters[NAME_GETTER_DATA_CHARACTER]];
    if (result.custodians) {
      listCharacterMerge = mergeDataLabel(result.custodians, listCharacterMerge);
      result.custodians = result.custodians.map(x => x.pk);
    }
    if (listCharacterMerge.length !== listCharacterStore.length) {
      commit("ht_store/matter/character2/setAllDataCharacter", listCharacterMerge, { root: true });
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
      result: { id: data.idParams.rowId, ...data.body }
    };
    commit("updateDataMutations", map);
    if (data.detail) {
      commit("updateDataMutationsDetail", map);
    }
    return result;
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
        id: data.idParams.id,
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
        id: data.id,
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
        id: data.id,
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
        id: data.idParams.id,
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
