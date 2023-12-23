import api from "@/sat-vue-toolkit/satlegal/api/matter/deposition/daubertTest";
// END GAME :)
export default {
  async getDaubertsFromApi({ commit }, payload) {
    commit("setLoading", true);
    const result = await api.getDaubertsFromApi(payload);
    commit("getDaubertsFromApi", { ...result, paging: payload.paging });
    commit("setLoading", false);
    return result;
  },
  async getDataDaubertTestDetailRequest({ commit }, payload) {
    const result = await api.getDaubertsFromApiDetail(payload);
    commit("getDaubertsFromApiDetail", result);
    return result;
  },
  async postDaubertsRequestApi({ commit }, payload) {
    const result = await api.postDaubertsRequestApi(payload);
    commit("postDaubertsRequestApi", result);
    return result;
  },
  async updateDaubertsRequestApi({ commit }, payload) {
    const result = await api.updateDaubertsRequestApi(payload);
    commit("updateDaubertsRequestApi", result);
    if (payload.detail) {
      commit("getDaubertsFromApiDetail", result)
    }

    return result;
  },
  async removeDaubertsRequestApi({ commit }, payload) {
    await api.removeDaubertsRequestApi(payload);
    commit("removeDaubertsRequestApi", payload.daubertId);
  },
  // review
  async postCreateReviews({ commit }, payload) {
    const result = await api.postCreateReviews(payload);
    commit("postCreateReviews", result);
    if (payload.detail) {
      commit("addReviewDetail", result)
    }
    return result;
  },
  async updateReviewsRequest({ commit }, payload) {
    const result = await api.updateReviewsRequest(payload);
    commit("updateReviewsRequest", {
      result,
      type: "updated",
      daubert: payload.daubertId,
      pk: result.pk,
    });
    if (payload.detail) {
      commit("updateReviewDetail", { reviewId: result.pk, body: result })
    }
    return result;
  },
  async removeReviewsRequest({ commit }, payload) {
    await api.removeReviews(payload);
    commit("removeReviews", payload);
    if (payload.detail) {
      commit("removeReviewDetail", payload)
    }
  },
  // attachment
  async addAttachmentRequest({ commit }, payload = {}) {
    const result = await api.addAttachmentRequest(payload);
    commit("addAttachmentRequest", { result });
    commit("updateReviewsRequest", {
      result,
      daubert: payload.daubertId,
      pk: payload.reviewId,
      type: "addAttachment"
    });
    if (payload.isShowRightPopup) {
      commit("addRightPopupReviews", {
        result,
        pk: payload.reviewId,
      })
    }
    return result;
  },

  async updateAttachmentRequest({ commit }, payload = {}) {
    const result = await api.updateAttachmentRequest(payload);
    commit("updateAttachmentRequest", {
      result,
      attachmentId: payload.attachmentId
    });
    commit("updateReviewsRequest", {
      result,
      daubert: payload.daubertId,
      pk: payload.reviewId,
      attachmentId: payload.attachmentId,
      type: "updateAttachment"
    });
    if (payload.isShowRightPopup) {
      commit("updateRightPopupReviews", {
        result,
        pk: payload.reviewId,
        attachmentId: payload.attachmentId,
      })
    }
    return result;
  },

  async removeAttachmentRequest({ commit }, payload) {
    const result = api.removeAttachmentRequest(payload);
    commit("removeAttachmentRequest", payload.attachmentId);
    commit("updateReviewsRequest", {
      daubert: payload.daubertId,
      pk: payload.reviewId,
      attachmentId: payload.attachmentId,
      type: "removeAttachment"
    });
    if (payload.isShowRightPopup) {
      commit("deleteRightPopupReviews", {
        pk: payload.reviewId,
        attachmentId: payload.attachmentId,
      })
    }
    return result;
  }
};
