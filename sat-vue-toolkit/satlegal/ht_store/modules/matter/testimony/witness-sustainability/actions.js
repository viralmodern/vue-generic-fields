import api from '@/sat-vue-toolkit/satlegal/api/matter/testimony/witness-sustainability';
import {
  getLoadingSlickTable, mergeDataLabel, defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";
import { NAME_GETTER_DATA_LABELS, NAME_GETTER_DATA_ISSUES } from "@/sat-vue-toolkit/satlegal/utils/constant";

export default {
  async getDataTestimonyRequest({ commit, rootGetters }, data = {}) {
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, true));
    const result = await api.getDataTestimony(data);
    commit("setLoading", getLoadingSlickTable(data.searchObject.group_items, false));

    let listIssueStore = rootGetters[NAME_GETTER_DATA_ISSUES];
    let listIssueMerge = [...rootGetters[NAME_GETTER_DATA_ISSUES]];

    let listLabelStore = rootGetters[NAME_GETTER_DATA_LABELS];
    let listLabelMerge = [...rootGetters[NAME_GETTER_DATA_LABELS]];
    // let sources = [];
    //  let listTagStore = rootGetters[NAME_GETTER_DATA_TAG];
    //  let listTagMerge = [...rootGetters[NAME_GETTER_DATA_TAG]];
    for (var key in result) {
      result[key].results.forEach((x, i) => {
        if (x.labels) {
          listLabelMerge = mergeDataLabel(x.labels, listLabelMerge);
          result[key].results[i].labels = result[key].results[i].labels.map(x => x.pk);
        }
        // if (x.tags) {
        //   x.tags.forEach(s => {
        //     if (!tags.some(s1 => s1.pk === s.pk)) {
        //       tags.push(s)
        //     }
        //     return
        //   })
        //   result[key].results[i].tags = result[key].results[i].tags.map(x => x.pk);
        // }
        if (x.legal_issues) {
          listIssueMerge = mergeDataLabel(x.legal_issues, listIssueMerge);
          result[key].results[i].legal_issues = result[key].results[i].legal_issues.map(x => x.pk);
        }
        // if (x.sources) {
        //   x.sources.forEach(s => {
        //     if (!sources.some(s1 => s1.pk === s.pk)) {
        //       sources.push(s)
        //     }
        //     return
        //   })
        //   result[key].results[i].sources = result[key].results[i].sources.map(x => x.pk);
        // }
      })
    }
    if (listIssueMerge.length !== listIssueStore.length) {
      commit("ht_store/matter/issues/getDataIssues", listIssueMerge, { root: true });
    }
    if (listLabelMerge.length !== listLabelStore.length) {
      commit("ht_store/matter/labels/getDataLabels", listLabelMerge, { root: true });
    }
    // commit("matter/source/getDataSource", sources, { root: true });
    // commit("matter/tag/getDataTag", tags, { root: true });
    result.isFirstCall = data.isFirstCall;
    commit("setDataTestimony", result);
    return result;
  },
  async addTestimonyRequest({ commit }, data = {}) {
    const result = await api.addTestimony(data);
    commit("addDataTestimony", { listIdGroup: data.listIdGroup, result });
    return result;
  },
  async updateTestimonyRequest({ commit }, data) {
    api.updateTestimony(data);
    const map = {
      result: { pk: data.idParams.depositionId, ...data.body }
    };
    commit("updateDataTestimony", map);
  },
  async removeTestimonyRequest({ commit }, data) {
    const result = await api.removeTestimony(data);
    commit("removeDataTestimony", data);
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
    commit("updateDataTestimony", map);
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
    commit("updateDataTestimony", map);
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
    commit("updateDataTestimony", {
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
    commit("updateDataTestimony", {
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
    commit("updateDataTestimony", {
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
    commit("updateDataTestimony", {
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
};
