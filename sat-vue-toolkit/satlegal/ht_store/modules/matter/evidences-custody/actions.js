import api from "@/sat-vue-toolkit/satlegal/api/matter/evidences-custody";
import {
  defaultDataActionComment,
  defaultDataActionCommentFeedback
} from "@/sat-vue-toolkit/satlegal/utils";

export default {
  async getDataEvidencesCustodyRequest({ commit }, data = {}) {
    commit("setLoading", true);
    const result = await api.getDataEvidencesCustody(data);
    result.isFirstCall = data.isFirstCall;
    commit("getDataEvidencesCustody", result);
    commit("setLoading", false);
    return result;
  },
  async addEvidencesCustodyRequest({ commit }, data) {
    const result = await api.addDataEvidencesCustody(data);
    commit("addEvidencesCustody", result);
    return result;
  },
  async updateEvidencesCustodyRequest({ commit }, data) {
    const result = api.updateDataEvidencesCustody(data);
    const map = {
      result: { evidenceId: data.idParams.evidenceId, ...data.body }
    };
    commit("updateEvidencesCustody", map);
    return result;
  },
  async removeEvidencesCustodyRequest({ commit }, data) {
    const result = await api.removeEvidencesCustody(data);
    commit("removeEvidencesCustody", data.evidenceId);
    return result;
  },

  // custody
  async addCustodyInEvidenceRequest({ commit }, data) {
    const result = api.addDataCustodyInEvidence(data);
    const map = {
      result: { evidenceId: data.idParams.evidenceId, evidence: data.idParams.evidenceId, ...data.body }
    };
    commit("updateEvidencesCustody", map);
    return result;
  },
  async updateCustodyInEvidenceRequest({ commit }, data) {
    const result = api.updateDataCustodyInEvidence(data);
    const map = {
      result: { evidenceId: data.idParams.evidenceId, ...data.body }
    };
    commit("updateEvidencesCustody", map);
    return result;
  },

  // custody item

  async addDataCustodyItemInEvidenceRequest({ commit }, data) {
    const result = await api.addDataCustodyItemInEvidence(data);
    const map = {
      evidenceId: data.idParams.evidenceId,
      body: result
    }
    commit("addDataCustodyItemInEvidence", map);
    return result;
  },
  async updateDataCustodyItemInEvidenceRequest({ commit }, data) {
    const result = api.updateDataCustodyItemInEvidence(data);
    const map = {
      evidenceId: data.idParams.evidenceId,
      custodyItemId: data.idParams.custodyItemId,
      body: data.body
    }
    commit("updateDataCustodyItemInEvidence", map);
    return result;
  },

  async removeDataCustodyItemInEvidenceRequest({ commit }, data) {
    const result = await api.removeDataCustodyItemInEvidence(data);
    commit("removeDataCustodyItemInEvidence", data);
    return result;
  },

  //comments
  async getDataCommentEvidencesCustodyRequest({ commit }, data = {}) {
    const result = await api.getDataCommentEvidencesCustody(data);
    const actionComment = {};
    result.results.forEach(x => {
      actionComment[x.pk] = { ...defaultDataActionComment };
    });
    commit("setActionComment", actionComment);

    commit("getDataCommentEvidencesCustody", result);
    return result;
  },

  async addCommentEvidencesCustodyRequest({ commit }, data = {}) {
    const result = await api.addCommentEvidencesCustody(data);
    commit("setActionComment", {
      [result.pk]: { ...defaultDataActionComment }
    });
    const dataEvidencesCustody = {
      result: {
        evidenceId: data.idParams.evidenceId,
        total_comments: data.totalComments
      }
    };
    commit("updateEvidencesCustody", dataEvidencesCustody);
    commit("addCommentEvidencesCustody", result);
    return result;
  },

  async updateCommentEvidencesCustodyRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentEvidencesCustody(data);
    commit("updateActionComment", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentEvidencesCustody", result);
    return result;
  },

  async removeCommentEvidencesCustodyRequest({ commit }, data = {}) {
    const result = api.removeCommentEvidencesCustody(data);
    commit("removeCommentEvidencesCustody", data.commentId);
    const dataEvidencesCustody = {
      result: {
        evidenceId: data.evidenceId,
        total_comments: data.totalComments
      }
    };
    commit("updateEvidencesCustody", dataEvidencesCustody);
    return result;
  },

  // comment feedback
  async getDataCommentFeedbackEvidencesCustodyRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loading: true
      }
    });
    const result = await api.getDataCommentEvidencesCustody(data);
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
    commit("getDataCommentFeedbackEvidencesCustody", result);
    return result;
  },

  async addCommentFeedbackEvidencesCustodyRequest({ commit }, data = {}) {
    commit("updateActionComment", {
      pk: data.idParams.parentId,
      action: {
        loadingAdd: true
      }
    });
    const result = await api.addCommentEvidencesCustody(data);
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
    const dataEvidencesCustody = {
      result: {
        evidenceId: data.idParams.evidenceId,
        total_comments: data.totalComments
      }
    };
    commit("updateChildCountCommentEvidencesCustody", comment);
    commit("updateEvidencesCustody", dataEvidencesCustody);
    commit("addCommentFeedbackEvidencesCustody", result);
    return result;
  },

  async updateCommentFeedbackEvidencesCustodyRequest({ commit }, data = {}) {
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: true
      }
    });
    const result = await api.updateCommentEvidencesCustody(data);
    commit("updateActionCommentFeedback", {
      pk: data.idParams.commentId,
      action: {
        loadingUpdate: false,
        isEdit: false
      }
    });
    commit("updateCommentFeedbackEvidencesCustody", result);
    return result;
  },

  async removeCommentFeedbackEvidencesCustodyRequest({ commit }, data = {}) {
    const result = api.removeCommentEvidencesCustody(data);
    commit("removeCommentFeedbackEvidencesCustody", data.commentId);
    const comment = {
      commentId: data.parentId,
      calculation(number) {
        return number - 1;
      }
    }
    const dataEvidencesCustody = {
      result: {
        pk: data.evidenceId,
        total_comments: data.totalComments
      }
    };
    commit("updateEvidencesCustody", dataEvidencesCustody);
    commit("updateChildCountCommentEvidencesCustody", comment);
    return result;
  },

};
