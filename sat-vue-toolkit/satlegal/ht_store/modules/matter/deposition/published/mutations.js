import _ from "lodash";
import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  getPublisheds(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataPublisheds = data.results;
      state.totals = data.count;
    } else {
      const mergeTasks = state.dataPublisheds.concat(data.results);
      const results = _.uniqBy(mergeTasks, "id"); //remove duplicates
      state.dataPublisheds = results;
      state.totals = data.count;
    }
  },
  updateDataPublisheds(state, data) {
    state.dataPublisheds = state.dataPublisheds.map(x => {
      if (x.id === data.id || x.id === data.draftId) {
        return { ...x, ...data.body };
      }
      return x;
    });
  },
  updateData(state, { result }) {
    state.dataPublisheds = state.dataPublisheds.map(x => {
      if (x.id === result.id) {
        return { ...x, ...result };
      }
      return x;
    });
  },
  addDataPublisheds(state, data) {
    state.dataPublisheds.push(data);
    state.totals++;
  },
  removeDataPublisheds(state, id) {
    state.dataPublisheds = state.dataPublisheds.filter(
      x => x.id !== id
    );
  },
  setLoading(state, status) {
    state.isLoadingGet = status;
  },
  //note
  getDataNotePublished(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },

  removeNotesInRFP(state, data) {
    state.dataPublisheds = state.dataPublisheds.filter(
      x => x.id !== data.id
    );
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

  addDataAttachmentInPublished(state, data) {
    state.dataPublisheds = state.dataPublisheds.map(x => {
      if (x.id === data.publishedId) {
        const attachments = [...x.attachments, ...data.attachment];
        return { ...x, attachments };
      }
      return x;
    });
    if (data.detail) {
      state.dataPublishedDetail.attachments = [...state.dataPublishedDetail.attachments, ...data.attachment]
    }
  },

  updateDataAttachmentInPublished(state, data) {
    state.dataPublisheds = state.dataPublisheds.map(x => {
      if (x.id === data.publishedId) {
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
      state.dataPublishedDetail.attachments = state.dataPublishedDetail.attachments.map(attachment => {
        if (attachment.pk === data.attachment.pk) {
          return data.attachment;
        }
        return attachment;
      });
    }
  },

  removeDataAttachmentInPublished(state, data) {
    state.dataPublisheds = state.dataPublisheds.map(x => {
      if (x.id === data.publishedId) {
        const attachments = x.attachments.filter(x => x.pk !== data.attachmentId);
        return { ...x, attachments };
      }
      return x;
    });
    if (data.detail) {
      state.dataPublishedDetail.attachments = state.dataPublishedDetail.attachments.filter(x => x.pk !== data.attachmentId);
    }
  },
  getPublishedDetail(state, data) {
    state.dataPublishedDetail = data
  },
  updateDataPublishedDetail(state, body) {
    state.dataPublishedDetail = { ...state.dataPublishedDetail, ...body }
  }
};
