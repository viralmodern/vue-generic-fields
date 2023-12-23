import api from "@/sat-vue-toolkit/satlegal/api/matter/deposition/keypleading";
import {
  getLoadingSlickTable,
  mergeDataLabel,
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_GETTER_DATA_GOALS } from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataKeyPleadingRequest({ commit, rootGetters }, data = {}) {
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, true)
    );
    const result = await api.getDataKeyPleading(data);
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, false)
    );
    let listGoalStore = rootGetters[NAME_GETTER_DATA_GOALS];
    let listGoalMerge = [...rootGetters[NAME_GETTER_DATA_GOALS]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.goals) {
          listGoalMerge = mergeDataLabel(x.goals, listGoalMerge);
          result[key].results[i].goals = result[key].results[i].goals.map(
            x => x.pk
          );
        }
      });
    }
    if (listGoalMerge.length !== listGoalStore.length) {
      commit("ht_store/matter/goals/getDataGoals", listGoalMerge, {
        root: true
      });
    }
    result.isFirstCall = data.isFirstCall;
    commit("setDataKeyPleading", result);
    return result;
  },
  async getKeyPleadingDetailRequest({ commit, rootGetters }, idParams) {
    const result = await api.getKeyPleadingDetail(idParams);
    let listGoalStore = rootGetters[NAME_GETTER_DATA_GOALS];
    let listGoalMerge = [...rootGetters[NAME_GETTER_DATA_GOALS]];
    if (result.goals) {
      listGoalMerge = mergeDataLabel(result.goals, listGoalMerge);
      result.goals = result.goals.map(
        x => x.pk
      );
    }
    if (listGoalMerge.length !== listGoalStore.length) {
      commit("ht_store/matter/goals/getDataGoals", listGoalMerge, {
        root: true
      });
    }
    commit("getKeyPleadingDetail", result)
    return result
  },
  async addKeyPleadingRequest({ commit }, data = {}) {
    const result = await api.addKeyPleading(data);
    commit("addDataKeyPleading", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updateKeyPleadingRequest({ commit }, { idParams, body, detail = false }) {
    api.updateKeyPleading({ idParams, body });
    const map = {
      result: { pk: idParams.keyPleadingId, ...body }
    };
    commit("updateDataKeyPleading", map);
    if (detail) {
      commit("updateDataKeyPleadingDetail", map)
    }
  },
  async removeKeyPleadingRequest({ commit }, data) {
    const result = await api.removeKeyPleading(data);
    commit("removeDataKeyPleading", data);
    return result;
  },

  //notes
  async getDataNotesKeyPleadingRequest({ commit }, data = {}) {
    const result = await api.getDataNotesKeyPleading(data);
    commit("getDataNoteKeyPleading", result);
    return result;
  },

  async addNotesKeyPleadingRequest({ commit }, data = {}) {
    const result = await api.addNotesKeyPleading(data);
    const dataKeyPleading = {
      result: {
        pk: data.idParams.keyPleadingId,
        total_notes: data.totalNotes
      }
    };
    commit("updateDataKeyPleading", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", dataKeyPleading)
    }
    return result;
  },

  async updateNotesKeyPleadingRequest(_, data = {}) {
    const result = await api.updateNotesKeyPleading(data);
    return result;
  },

  async removeNotesKeyPleadingRequest({ commit }, data) {
    const result = await api.removeNotesKeyPleading(data);
    const dataKeyPleading = {
      result: {
        pk: data.keyPleadingId,
        total_notes: data.totalNotes
      }
    };
    commit("updateDataKeyPleading", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", dataKeyPleading)
    }
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
        pk: data.idParams.keyPleadingId,
        total_comments: data.totalComments
      }
    };
    commit("updateDataKeyPleading", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", dataKeyPleading)
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
        pk: data.keyPleadingId,
        total_comments: data.totalComments
      }
    };
    commit("updateDataKeyPleading", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", dataKeyPleading)
    }
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
        pk: data.idParams.keyPleadingId,
        total_comments: data.totalComments
      }
    };
    commit("updateChildCountCommentKeyPleading", comment);
    commit("updateDataKeyPleading", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", dataKeyPleading)
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
        pk: data.keyPleadingId,
        total_comments: data.totalComments
      }
    };
    commit("updateDataKeyPleading", dataKeyPleading);
    if (data.detail) {
      commit("updateDataKeyPleadingDetail", dataKeyPleading)
    }
    commit("updateChildCountCommentKeyPleading", comment);
    return result;
  },
};
