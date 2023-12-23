import api from "../../../../api/matter/evidences";
import {
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";

export default {
  async getEvidencesFromApi({ commit }, payload) {
    commit("setLoading", true);
    const result = await api.getEvidencesFromApi(payload);
    result.isFirstCall = payload.isFirstCall;
    commit("getEvidencesFromApi", result);
    commit("setLoading", false);
    return result;
  },
  async postEvidences({ commit }, payload) {
    const result = await api.postEvidences(payload);
    commit("postEvidences", { listIdGroup: payload.listIdGroup, result });
    return result;
  },
  async updateReportRequest({ commit }, data) {
    const result = await api.updateReport(data);
    const map = {
      evidencesId: data.idParams.rowId, body: { total_reports: result ? 1 : 0, reported_object: result || null }
    };
    commit("patchEvidences", map);
    if (data.detail) {
      commit("patchEvidencesDetail", map)
    }
    return result
  },
  async patchEvidences({ commit }, payload) {
    const result = api.patchEvidences(payload);
    api.patchEvidences(payload);
    const map = {
      evidencesId: payload.idParams.evidencesId,
      body: payload.body,
    };
    commit("patchEvidences", map);
    if (payload.detail) {
      commit("patchEvidencesDetail", map);
    }
    return result;
  },
  async removeEvidences({ commit }, payload) {
    const result = await api.removeEvidences(payload);
    commit("removeEvidences", payload);
    return result;
  },

  // Chain of Custody Slick grid
  async getDataChainCustodyFromApi({ commit }, payload) {
    commit("setLoading", true);
    const result = await api.getDataChainCustodyFromApi(payload);
    commit("getDataChainCustodyFromApi", result);
    commit("setLoading", false);
    return result;
  },
  async postChainCustody({ commit }, payload) {
    const result = await api.postChainCustody(payload);
    commit("postChainCustody", result);
    return result;
  },
  async patchChainCustody({ commit }, payload) {
    const result = await api.patchChainCustody(payload);
    commit("patchChainCustody", payload);
    return result;
  },
  async deleteChainCustody({ commit }, payload) {
    const result = await api.deleteChainCustody(payload);
    commit("deleteChainCustody", result);
  },
  async getEvidencesDetailRequest({ commit }, data) {
    const result = await api.getEvidencesDetail(data);
    commit("getEvidencesDetail", result);
    return result;
  },
  async updateEvidencesDetailRequest({ commit }, data) {
    const result = await api.updateEvidencesDetail(data);
    const dataMap = {
      ...result,
      tags: result.tags.map(x => x.pk)
    };
    commit("getEvidencesDetail", dataMap);
    commit("updateDataEvidences", { result: dataMap });
    return result;
  },
  // relations
  async updateRelationEvidence({ commit }, data) {
    api.updateRelationEvidence(data);
    commit("updateRelationEvidence", {
      id: data.idParams.evidencesId,
      result: data.body,
      detail: data.detail
    });
  },

  async removeRelationEvidence({ commit }, data) {
    api.removeRelationEvidence(data);
    commit("removeRelationEvidence", {
      id: data.evidencesId,
      result: {
        objectId: data.objectId,
        contentTypeId: data.contentTypeId,
        detail: data.detail
      }
    });
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
    commit("patchEvidences", {
      evidencesId: data.idParams.evidencesId,
      body: {
        total_comments: data.totalComments
      }
    });
    if (data.detail) {
      commit("patchEvidencesDetail", {
        evidencesId: data.idParams.evidencesId,
        body: {
          total_comments: data.totalComments
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
    commit("patchEvidences", {
      evidencesId: data.evidencesId,
      body: {
        total_comments: data.totalComments
      }
    });
    if (data.detail) {
      commit("patchEvidencesDetail", {
        evidencesId: data.evidencesId,
        body: {
          total_comments: data.totalComments
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
    commit("patchEvidences", {
      evidencesId: data.evidencesId,
      body: {
        total_comments: data.totalComments
      }
    });
    if (data.detail) {
      commit("patchEvidencesDetail", {
        evidencesId: data.evidencesId,
        body: {
          total_comments: data.totalComments
        }
      });
    }
    commit("updateChildCountComment", comment);
    return result;
  },

  // comment feedback
  async getDataCommentFeedback({ commit }, data = {}) {
    commit("updateActionComment", {
      evidencesId: data.idParams.parentId,
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
    commit("patchEvidences", {
      evidencesId: data.idParams.evidencesId,
      body: {
        total_comments: data.totalComments
      }
    });
    if (data.detail) {
      commit("patchEvidencesDetail", {
        evidencesId: data.idParams.evidencesId,
        body: {
          total_comments: data.totalComments
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
