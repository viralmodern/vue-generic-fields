export default {
  // END GAME :)
  getDaubertsFromApi(state, response) {
    state.dataDaubertTest = response.paging
      ? state.dataDaubertTest.concat(response.results)
      : response.results;
    state.totals_daubert = response.count;
  },
  postDaubertsRequestApi(state, response) {
    state.dataDaubertTest.push(response);
    state.totals_daubert = state.totals_daubert++;
  },
  updateDaubertsRequestApi(state, response) {
    state.dataDaubertTest = state.dataDaubertTest.map(m => {
      if (m.pk === response.pk) {
        return { ...m, ...response };
      }
      return m;
    });
  },
  updateDauberts(state, { result }) {
    state.dataDaubertTest = state.dataDaubertTest.map(m => {
      if (m.pk === result.pk) {
        return { ...m, ...result };
      }
      return m;
    });
  },
  removeDaubertsRequestApi(state, daubertId) {
    state.dataDaubertTest = state.dataDaubertTest.filter(
      f => f.pk !== parseInt(daubertId)
    );
    state.totals_daubert = state.totals_daubert--;
  },
  setLoading(state, loading) {
    state.isLoadingGet = loading;
  },
  // reviews
  postCreateReviews(state, response) {
    state.dataDaubertTest = state.dataDaubertTest.map(m => {
      if (m.pk === parseInt(response.daubert)) {
        return { ...m, reviews: [...m.reviews, response] };
      }
      return m;
    });
  },
  removeReviews(state, response) {
    state.dataDaubertTest = state.dataDaubertTest.map(m => {
      if (m.pk === parseInt(response.daubertId)) {
        return {
          ...m,
          reviews: m.reviews.filter(f => f.pk !== response.reviewId)
        };
      }
      return m;
    });
  },
  updateReviewsRequest(state, response) {
    state.dataDaubertTest = state.dataDaubertTest.map(m => {
      if (m.pk === parseInt(response.daubert)) {
        return {
          ...m,
          reviews: m.reviews.map(r => {
            if (r.pk === response.pk && response.type === 'updated') {
              return { ...r, ...response.result };
            } else if (
              response.type === "addAttachment" &&
              r.pk === response.pk
            ) {
              return {
                ...r,
                attachments: r.attachments.concat(response.result)
              };
            } else if (
              response.type === "updateAttachment" &&
              r.pk === response.pk
            ) {
              return {
                ...r,
                attachments: r.attachments.map(att => {
                  if (att.pk === response.attachmentId) {
                    return { ...att, ...response.result };
                  }
                  return att;
                })
              };
            } else if (
              response.type === "removeAttachment" &&
              r.pk === response.pk
            ) {
              return {
                ...r,
                attachments: r.attachments.filter(
                  f => f.pk !== response.attachmentId
                )
              };
            }
            return r;
          })
        };
      }
      return m;
    });
  },
  //attachment
  getDataAttachments(state, response) {
    state.dataAttachments = response;
  },
  addAttachmentRequest(state, response) {
    state.dataAttachments = [...state.dataAttachments, ...response.result];
  },
  updateAttachmentRequest(state, response) {
    state.dataAttachments = state.dataAttachments.map(r => {
      if (r.pk === response.attachmentId) {
        return { ...r, ...response.result };
      }
      return r;
    });
  },
  removeAttachmentRequest(state, attachmentId) {
    state.dataAttachments = state.dataAttachments.filter(
      f => f.pk !== attachmentId
    );
  },
  getDaubertsFromApiDetail(state, data) {
    state.dataDaubertTestDetail = data
  },
  updateDetail(state, data) {
    state.dataDaubertTestDetail = { ...state.dataDaubertTestDetail, ...data }
  },
  addReviewDetail(state, data) {
    state.dataDaubertTestDetail.reviews = [...state.dataDaubertTestDetail.reviews, data]
  },
  addRightPopupReviews(state, { result, pk }) {
    state.dataDaubertTestDetail.reviews = state.dataDaubertTestDetail.reviews.map(item => {
      if (item.pk === pk) {
        const attachments = [...item.attachments, ...result]
        return { ...item, attachments }
      }
      return item
    })
  },
  updateRightPopupReviews(state, { result, pk, attachmentId }) {
    state.dataDaubertTestDetail.reviews = state.dataDaubertTestDetail.reviews.map(item => {
      if (item.pk === pk) {
        const attachments = item.attachments.map(attachment => {
          if (attachment.pk === attachmentId) {
            return result
          }
          return attachment
        })
        return { ...item, attachments }
      }
      return item
    })
  },
  deleteRightPopupReviews(state, { pk, attachmentId }) {
    state.dataDaubertTestDetail.reviews = state.dataDaubertTestDetail.reviews.map(item => {
      if (item.pk === pk) {
        const attachments = item.attachments.filter(attachment => attachment.pk !== attachmentId)
        return { ...item, attachments }
      }
      return item
    })
  },
  removeReviewDetail(state, { reviewId }) {
    state.dataDaubertTestDetail.reviews = state.dataDaubertTestDetail.reviews.filter(item => item.pk !== reviewId)
  },
  updateReviewDetail(state, { reviewId, body }) {
    state.dataDaubertTestDetail.reviews = state.dataDaubertTestDetail.reviews.map(item => {
      if (item.pk == reviewId) {
        return { ...item, ...body }
      }
      return item
    })

  }
};
