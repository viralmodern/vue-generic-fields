import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataRFP(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataRFP = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataRFP[key] || {}).results || []
        ).concat(data[key].results);
        const results = removeObjectDuplicate(mergeTasks, "id"); //remove duplicates
        state.dataRFP[key] = {
          ...data[key],
          results
        };
      }
      state.dataRFP = { ...state.dataRFP };
    }
  },
  setAllDataRFP(state, data) {
    state.dataAllRFP = data;
  },
  addDataRFP(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataRFP[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataRFP(state, { result }) {
    for (const key in state.dataRFP) {
      state.dataRFP[key].results = state.dataRFP[
        key
      ].results.map(x => {
        if (x.id === result.id || x.pk === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataRFP(state, { name, RFPId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataRFP) {
        state.dataRFP[key].results = state.dataRFP[
          key
        ].results.filter(x => x.id !== RFPId);
        state.dataRFP[key].totals--;
      }
    } else {
      state.dataRFP[name].results = state.dataRFP[
        name
      ].results.filter(x => x.id !== RFPId);
      state.dataRFP[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  getDataCommentRFP(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },
  updateCommentInRFP(state, data) {
    for (var key in state.dataRFP) {
      state.dataRFP[key].results = state.dataRFP[
        key
      ].results.map(x => {
        if (x.id === data.exhibitsId) {
          const comments = [...x.comments, data.comments];
          return { ...x, comments };
        }
        return x;
      });
    }
  },

  // attachments

  getDataAttachments(state, data) {
    state.dataAttachments = data;
  },

  addDataAttachment(state, data) {
    state.dataAttachments = [...state.dataAttachments, ...data]
  },

  updateDataAttachment(state, data) {
    state.dataAttachments = state.dataAttachments.map(x => {
      if (x.pk === data.attachmentId) {
        return { ...x, ...data.result }
      }
      return x;
    });
  },

  removeDataAttachment(state, attachmentId) {
    state.dataAttachments = state.dataAttachments.filter(x => x.pk !== attachmentId);
  },

  addDataAttachmentInRFP(state, data) {
    for (var key in state.dataRFP) {
      state.dataRFP[key].results = state.dataRFP[
        key
      ].results.map(x => {
        if (x.id === data.requestForProductionId) {
          const attachments = [...x.attachments, ...data.attachment];
          return { ...x, attachments };
        }
        return x;
      });
    }
  },

  updateDataAttachmentInRFP(state, data) {
    for (var key in state.dataRFP) {
      state.dataRFP[key].results = state.dataRFP[
        key
      ].results.map(x => {
        if (x.id === data.requestForProductionId) {
          const attachments = x.attachments.map(attachment => {
            if (attachment.pk === data.attachment.pk) {
              return data.attachment;
            }
            return attachment;
          });
          return { ...x, attachments };
        }
        return x;
      });
    }
  },

  removeDataAttachmentInRFP(state, data) {
    for (var key in state.dataRFP) {
      state.dataRFP[key].results = state.dataRFP[
        key
      ].results.map(x => {
        if (x.id === data.requestForProductionId) {
          const attachments = x.attachments.filter(x => x.pk !== data.attachmentId);
          return { ...x, attachments };
        }
        return x;
      });
    }
  },

  //notes
  getDataNotesRFP(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },

  //comments
  getDataComment(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedback(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addComment(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedback(state, data) {
    state.dataCommentFeedback.unshift(data);
  },

  setActionComment(state, data) {
    state.actionComment = { ...state.actionComment, ...data };
  },

  setActionCommentFeedback(state, data) {
    state.actionCommentFeedback = { ...state.actionCommentFeedback, ...data };
  },

  updateActionComment(state, data) {
    state.actionComment[data.pk] = { ...state.actionComment[data.pk], ...data.action }
  },

  updateActionCommentFeedback(state, data) {
    state.actionCommentFeedback[data.pk] = { ...state.actionCommentFeedback[data.pk], ...data.action }
  },

  updateComment(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedback(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountComment(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeComment(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedback(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  },

  setDataRFPDetail(state, data) {
    state.dataRFPDetail = data
  },
  updateDataRFPDetail(state, { result }) {
    state.dataRFPDetail = { ...state.dataRFPDetail, ...result }
  },
  addAttachmentDetail(state, data) {
    let { attachments } = state.dataRFPDetail
    attachments = [...attachments, ...data]
    state.dataRFPDetail = { ...state.dataRFPDetail, attachments }
  },
  updateDataAttachmentDetail(state, { attachmentId, result }) {
    let { attachments } = state.dataRFPDetail
    attachments = attachments.map(x => {
      if (x.pk === attachmentId) {
        return result
      }
      return x
    })
    state.dataRFPDetail = { ...state.dataRFPDetail, ...attachments }
  },
  removeDataAttachmentDetail(state, id) {
    state.dataRFPDetail.attachments = state.dataRFPDetail.attachments.filter(x => x.pk !== id)
  }
};
