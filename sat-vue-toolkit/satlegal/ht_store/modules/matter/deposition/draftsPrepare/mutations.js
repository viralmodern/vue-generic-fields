import _ from "lodash";
import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  getDrafts(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataDrafts = data.results;
      state.totals = data.count;
    } else {
      const mergeTasks = state.dataDrafts.concat(data.results);
      const results = _.uniqBy(mergeTasks, "id"); //remove duplicates
      state.dataDrafts = results;
      state.totals = data.count;
    }
  },
  updateDataDrafts(state, data) {
    state.dataDrafts = state.dataDrafts.map(x => {
      if (x.id === data.draftId || x.id === data.id) {
        return { ...x, ...data.body };
      }
      return x;
    });
  },
  updateData(state, { result }) {
    state.dataDrafts = state.dataDrafts.map(x => {
      if (x.id === result.id) {
        return { ...x, ...result };
      }
      return x;
    });
  },
  addDataDrafts(state, data) {
    state.dataDrafts.push(data);
    state.totals++;
  },
  removeDataDrafts(state, id) {
    state.dataDrafts = state.dataDrafts.filter(
      x => x.id !== id
    );
  },
  setLoading(state, status) {
    state.isLoadingGet = status;
  },
  //notes
  getDataNoteDrafts(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },
  //comments
  getDataCommentDrafts(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackDrafts(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentDrafts(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackDrafts(state, data) {
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

  updateCommentDrafts(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedbackDrafts(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountCommentDrafts(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeCommentDrafts(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackDrafts(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  },
  // attachments
  getDataAttachments(state, data) {
    state.dataAttachments = data;
  },

  adddDataAttachment(state, data) {
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

  addDataAttachmentInDraft(state, data) {
    state.dataDrafts = state.dataDrafts.map(x => {
      if (x.id === data.draftId) {
        const attachments = [...x.attachments, ...data.attachment];
        return { ...x, attachments };
      }
      return x;
    });
    if (data.detail) {
      state.dataDraftsDetail.attachments = [...state.dataDraftsDetail.attachments, ...data.attachment]
    }
  },

  updateDataAttachmentInDraft(state, data) {
    state.dataDrafts = state.dataDrafts.map(x => {
      if (x.id === data.draftId) {
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
    if (data.detail) {
      state.dataDraftsDetail.attachments = state.dataDraftsDetail.attachments.map(attachment => {
        if (attachment.pk === data.attachment.pk) {
          return data.attachment;
        }
        return attachment;
      });
    }
  },

  removeDataAttachmentInDraft(state, data) {
    state.dataDrafts = state.dataDrafts.map(x => {
      if (x.id === data.draftId) {
        const attachments = x.attachments.filter(x => x.pk !== data.attachmentId);
        return { ...x, attachments };
      }
      return x;
    });
    if (data.detail) {
      state.dataDraftsDetail.attachments = state.dataDraftsDetail.attachments.filter(x => x.pk !== data.attachmentId);
    }
  },
  getDataDraftsDetail(state, data) {
    state.dataDraftsDetail = data
  },
  updateDataDraftsDetail(state, body) {
    state.dataDraftsDetail = { ...state.dataDraftsDetail, ...body }
  }
};
