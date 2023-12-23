import api from '@/sat-vue-toolkit/satlegal/api/matter/subpoena/subpoenaSet';
import {
  getLoadingSlickTable,
  mergeDataLabel,
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";
import {
  NAME_GETTER_DATA_TAG,
} from "@/sat-vue-toolkit/satlegal/utils/constant";
export default {
  async getDataSubpoenaRequest({ commit, rootGetters }, data = {}) {
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, true)
    );
    const result = await api.getDataSubpoena(data);
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, false)
    );
    let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.tags) {
          listTagMerge = mergeDataLabel(x.tags, listTagMerge);
          result[key].results[i].tags = result[key].results[i].tags.map(x => x.pk);
        }
        result[key].results[i].party = result[key].results[i].party && result[key].results[i].party.pk
      })
    }
    if (listTagMerge.length !== listTagStore.length) {
      commit("ht_store/matter/tag/getDataTag", listTagMerge, { root: true });
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataSubpoena", result);
    return result;
  },
  async getSupoenaDetailRequest({ commit, rootGetters }, payload) {
    const result = await api.getSupoenaDetail(payload)
    let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];
    if (result.tags) {
      listTagMerge = mergeDataLabel(result.tags, listTagMerge);
      result.tags = result.tags.map(x => x.pk);
    }
    result.party = result.party && result.party.pk
    if (listTagMerge.length !== listTagStore.length) {
      commit("ht_store/matter/tag/getDataTag", listTagMerge, { root: true });
    }
    commit("getSupoenaDetail", result)
    return result;
  },
  async addSubpoenaRequest({ commit }, data = {}) {
    const result = await api.addSubpoena(data);
    commit("addDataSubpoena", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updateSubpoenaRequest({ commit }, { idParams, body, detail = false }) {
    api.updateSubpoena({ idParams, body });
    const map = {
      result: { id: idParams.subpoenaId, ...body }
    };
    commit("updateDataSubpoena", map);
    if (detail) {
      commit("updateDataSubpoenaDetail", map);
    }
  },
  async updateSubpoenaAsyncRequest({ commit }, { idParams, body, detail = false }) {
    const result = await api.updateSubpoena({ idParams, body });
    const map = {
      result: { id: result.pk, proof_of_service: result.proof_of_service }
    };
    commit("updateDataSubpoena", map);
    if (detail) {
      commit("updateDataSubpoenaDetail", map);
    }
    return result
  },
  async removeSubpoenaRequest({ commit }, data) {
    const result = await api.removeSubpoena(data);
    commit("removeDataSubpoena", data);
    return result;
  },
  //notes
  async getDataNotesRequest({ commit }, data = {}) {
    const result = await api.getDataNotes(data);
    commit("getDataNote", result);
    return result;
  },
  async addNotesRequest({ commit }, { idParams, body, detail = false, totalNotes }) {
    const result = await api.addNotes({ idParams, body });
    commit("updateNotes", { id: idParams.rowId, notes: result });
    const data = {
      result: {
        total_notes: totalNotes,
      }
    }
    if (detail) {
      commit("updateDataSubpoenaDetail", data);
    }
    return result;
  },
  async updateNotesRequest(_, data = {}) {
    const result = await api.updateNotes(data);
    return result;
  },
  async removeNotesRequest({ commit }, data) {
    const result = await api.removeNotes(data);
    commit("removeNotes", { id: data.rowId, noteId: data.noteId });
    const body = {
      result: {
        total_notes: data.totalNotes,
      }
    }
    if (data.detail) {
      commit("updateDataSubpoenaDetail", body);
    }
    return result;
  },

  //comments
  async getDataCommentSubpoenaSetRequest({ commit }, data = {}) {
    const result = await api.getDataCommentSubpoenaSet(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);
    commit("getDataCommentSubpoenaSet", result);
    return result;
  },

  async addCommentSubpoenaSetRequest({ commit }, data = {}) {
    const result = await api.addCommentSubpoenaSet(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const dataSubpoenaSet = {
      result: {
        id: data.idParams.id,
        total_comments: data.totalComments
      }
    };
    commit("updateDataSubpoena", dataSubpoenaSet);
    if (data.detail) {
      commit("updateDataSubpoenaDetail", dataSubpoenaSet);
    }
    commit("addCommentSubpoenaSet", result);
    return result;
  },

  async updateCommentSubpoenaSetRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentSubpoenaSet(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentSubpoenaSet", result);
    return result;
  },

  async removeCommentSubpoenaSetRequest({ commit }, data = {}) {
    const result = api.removeCommentSubpoenaSet(data);
    commit("removeCommentSubpoenaSet", data.commentId);
    const dataSubpoenaSet = {
      result: {
        id: data.id,
        total_comments: data.totalComments
      }
    };
    if (data.detail) {
      commit("updateDataSubpoenaDetail", dataSubpoenaSet);
    }
    commit("updateDataSubpoena", dataSubpoenaSet);
    return result;
  },

  async removeCommentFeedbackSubpoenaSetRequest({ commit }, data = {}) {
    const result = api.removeCommentSubpoenaSet(data);
    commit("removeCommentFeedbackSubpoenaSet", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    const dataSubpoenaSet = {
      result: {
        id: data.id,
        total_comments: data.totalComments
      }
    };
    commit("updateDataSubpoena", dataSubpoenaSet);
    if (data.detail) {
      commit("updateDataSubpoenaDetail", dataSubpoenaSet);
    }
    commit("updateChildCountCommentSubpoenaSet", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackSubpoenaSetRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentSubpoenaSet(data);
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
    commit("getDataCommentFeedbackSubpoenaSet", result);
    return result;
  },

  async addCommentFeedbackSubpoenaSetRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentSubpoenaSet(data);
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
    const dataSubpoenaSet = {
      result: {
        id: data.idParams.id,
        total_comments: data.totalComments
      }
    };
    if (data.detail) {
      commit("updateDataSubpoenaDetail", dataSubpoenaSet);
    }
    commit("updateChildCountCommentSubpoenaSet", comment);
    commit("updateDataSubpoena", dataSubpoenaSet);
    commit("addCommentFeedbackSubpoenaSet", result);
    return result;
  },

  async updateCommentFeedbackSubpoenaSetRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentSubpoenaSet(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackSubpoenaSet", result);
    return result;
  },
};
