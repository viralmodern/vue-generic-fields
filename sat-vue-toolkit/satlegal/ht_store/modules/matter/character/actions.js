import api from '@/sat-vue-toolkit/satlegal/api/matter/character';
import {
  getLoadingSlickTable,
  mergeDataLabel,
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";
import {
  NAME_GETTER_DATA_TAG,
  NAME_GETTER_DATA_ISSUES
} from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataCharacter2Request({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataCharacter(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));

    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];

    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.tags) {
          listTagMerge = mergeDataLabel(x.tags, listTagMerge);
          result[key].results[i].tags = result[key].results[i].tags.map(x => x.pk);
        }
        if (x.legal_issues) {
          listIssueMerge = mergeDataLabel(x.legal_issues, listIssueMerge);
          result[key].results[i].legal_issues = result[key].results[i].legal_issues.map(x => x.pk);
        }
      })
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, { root: true });
    }
    if (listTagMerge.length !== listTagStore.length) {
      commit("ht_store/matter/tag/getDataTag", listTagMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataCharacter", result);
    return result;
  },
  async getAllDataCharacterRequest({ commit }, data = {}) {
    const result = await api.getAllDataCharacter(data);
    commit("setAllDataCharacter", result);
    return result;
  },

  async addCharacterRequest({ commit }, data = {}) {
    const result = await api.addCharacter(data);
    commit("addDataCharacter", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async addCharacterNoGroupByRequest({ commit }, data = {}) {
    const result = await api.addCharacter(data);
    commit("addCharacterNoGroupBy", result);
    return result;
  },

  async updateCharacterRequest({ commit }, data) {
    api.updateCharacter(data);
    const map = {
      result: { id: data.idParams.characterId, ...data.body }
    };
    commit("updateDataCharacter", map);
  },
  async updateCharacterAsyncRequest({ commit }, data) {
    const result = await api.updateCharacter(data);
    const map = {
      result: { id: data.idParams.characterId, ...result }
    };
    commit("updateDataCharacter", map);
    return result;
  },

  // note

  async getDataNotesCharacterRequest({ commit }, data = {}) {
    const result = await api.getDataNotesCharacter(data);
    commit("getDataNoteCharacter", result);
    return result;
  },

  async addNotesCharacterRequest({ commit }, data = {}) {
    const result = await api.addNotesCharacter(data);
    const dataNote = {
      result: {
        id: data.idParams.characterId,
        total_notes: data.totalNotes
      }
    };
    commit("updateCharacterDetail", { total_notes: data.totalNotes });
    commit("updateDataCharacter", dataNote);
    return result;
  },

  async removeNotesCharacterRequest({ commit }, data) {
    const result = api.removeNotesCharacter(data);
    const dataNote = {
      result: {
        id: data.characterId,
        total_notes: data.totalNotes
      }
    };
    commit("updateCharacterDetail", { total_notes: data.totalNotes });
    commit("updateDataCharacter", dataNote);
    return result;
  },

  async updateNotesCharacterRequest(_, data = {}) {
    const result = await api.updateNotesCharacter(data);
    return result;
  },

  async removeCharacterRequest({ commit }, data) {
    const result = await api.removeCharacter(data);
    commit("removeDataCharacter", data);
    return result;
  },
  async getCharacterDetailRequest({ commit, rootGetters }, data) {
    const result = await api.getCharacterDetail(data);

    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];

    if (result.tags) {
      listTagMerge = mergeDataLabel(result.tags, listTagMerge);
      result.tags = result.tags.map(x => x.pk);
    }
    if (result.legal_issues) {
      listIssueMerge = mergeDataLabel(result.legal_issues, listIssueMerge);
      result.legal_issues = result.legal_issues.map(x => x.pk);
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, { root: true });
    }
    if (listTagMerge.length !== listTagStore.length) {
      commit("ht_store/matter/tag/getDataTag", listTagMerge, { root: true });
    }

    commit("getCharacterDetail", result);
    return result;
  },
  async updateCharacterDetailRequest({ commit }, data) {
    api.updateCharacter(data);
    const map = {
      result: { id: data.idParams.characterId, ...data.body }
    };
    commit("updateCharacterDetail", data.body);
    commit("updateDataCharacter", map);
  },

  async updateCharacterDetailAsyncRequest({ commit }, data) {
    const result = await api.updateCharacter(data);
    const map = {
      result: { id: data.idParams.characterId, ...result }
    };
    commit("updateCharacterDetail", { [Object.keys(data.body)[0]]: result[Object.keys(data.body)[0]] });
    commit("updateDataCharacter", map);
    return result;
  },

  // histories
  async getHistoriesCharacters({ commit }, payload) {
    const result = await api.getHistoriesCharacters(payload);
    commit("getHistoriesCharacters", { ...result, type: payload.type });
    return result;
  },
  async postHistoriesCharacters({ commit }, payload) {
    const result = await api.postHistoriesCharacters(payload);
    commit("setLoadingHistories", true);
    commit("postHistoriesCharacters", result);
    commit("setLoadingHistories", false);
    return result;
  },
  async patchHistoriesCharacters({ commit }, payload) {
    const result = await api.patchHistoriesCharacters(payload);
    commit("patchHistoriesCharacters", result);
    return result;
  },
  async deleteHistoriesCharacters({ commit }, payload) {
    const result = await api.deleteHistoriesCharacters(payload);
    commit("deleteHistoriesCharacters", payload);
    return result;
  },

  //comments
  async getDataCommentHistoryRequest({ commit }, data = {}) {
    const result = await api.getDataCommentHistory(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentHistory", result);
    return result;
  },

  async addCommentHistoryRequest({ commit }, data = {}) {
    const result = await api.addCommentHistory(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const dataHistory = {
      pk: data.idParams.historyId,
      total_comments: data.totalComments
    };
    commit("patchHistoriesCharacters", dataHistory);
    commit("addCommentHistory", result);
    return result;
  },

  async updateCommentHistoryRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentHistory(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentHistory", result);
    return result;
  },

  async removeCommentHistoryRequest({ commit }, data = {}) {
    const result = api.removeCommentHistory(data);
    commit("removeCommentHistory", data.commentId);
    const dataHistory = {
      pk: data.historyId,
      total_comments: data.totalComments
    };
    commit("patchHistoriesCharacters", dataHistory);
    return result;
  },

  async removeCommentFeedbackHistoryRequest({ commit }, data = {}) {
    const result = api.removeCommentHistory(data);
    commit("removeCommentFeedbackHistory", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    const dataHistory = {
      pk: data.historyId,
      total_comments: data.totalComments
    };
    commit("patchHistoriesCharacters", dataHistory);
    commit("updateChildCountCommentHistory", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackHistoryRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentHistory(data);
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
    commit("getDataCommentFeedbackHistory", result);
    return result;
  },

  async addCommentFeedbackHistoryRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentHistory(data);
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
    const dataHistory = {
      pk: data.idParams.historyId,
      total_comments: data.totalComments
    };
    commit("updateChildCountCommentHistory", comment);
    commit("patchHistoriesCharacters", dataHistory);
    commit("addCommentFeedbackHistory", result);
    return result;
  },

  async updateCommentFeedbackHistoryRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentHistory(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackHistory", result);
    return result;
  },

  // relations
  async updateRelationCharacterRequest({ commit }, data) {
    api.updateRelationCharacter(data);
    commit("updateDataRelationCharacter", {
      id: data.idParams.characterId,
      result: data.body
    });
  },

  async removeRelationCharacterRequest({ commit }, data) {
    api.removeRelationCharacter(data);
    commit("removeDataRelationCharacter", {
      id: data.characterId,
      result: {
        objectId: data.objectId,
        contentTypeId: data.contentTypeId
      }
    });
  },
};
