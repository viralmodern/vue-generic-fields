import _ from "lodash";
import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  getDataDocument(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataDocument = data.results;
      state.totals = data.count;
    } else {
      const mergeTasks = state.dataDocument.concat(data.results);
      const results = _.uniqBy(mergeTasks, "pk"); //remove duplicates
      state.dataDocument = results;
      state.totals = data.count;
    }
  },
  updateDocument(state, data) {
    state.dataDocument = state.dataDocument.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data.body };

      }
      return x;
    });
  },
  postDocument(state, data) {
    state.dataDocument.push(data);
    state.totals++;
  },
  removeDocument(state, pk) {
    state.dataDocument = state.dataDocument.filter(
      x => x.pk !== pk
    );
  },
  setLoading(state, status) {
    state.isLoadingGetDocument = status;
  },
  //comments
  getDataCommentDocument(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackDocument(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentDocument(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackDocument(state, data) {
    state.dataCommentFeedback.unshift(data);
  },

  setActionComment(state, data) {
    state.actionComment = {...state.actionComment, ...data};
  },

  setActionCommentFeedback(state, data) {
    state.actionCommentFeedback = {...state.actionCommentFeedback, ...data};
  },

  updateActionComment(state, data) {
    state.actionComment[data.pk] = {...state.actionComment[data.pk], ...data.action}
  },

  updateActionCommentFeedback(state, data) {
    state.actionCommentFeedback[data.pk] = {...state.actionCommentFeedback[data.pk], ...data.action}
  },

  updateCommentDocument(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },

  updateCommentFeedbackDocument(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },

  updateChildCountCommentDocument(state, {commentId, calculation}) {
    state.dataComment = state.dataComment.map(x => {
      if(x.pk === commentId) {
        return {...x, child_count: calculation(x.child_count)};
      }
      return x;
    })
  },

  removeCommentDocument(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackDocument(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
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
      if(x.pk === data.attachmentId) {
        return {...x, ...data.result}
      }
      return x;
    });
  },

  removeDataAttachment(state, attachmentId) {
    state.dataAttachments = state.dataAttachments.filter(x => x.pk !== attachmentId);
  },

  addDataAttachmentIn(state, data) {
      state.dataDocument = state.dataDocument.map(x => {
        if(x.pk === data.requestForProductionId) {
          const attachments = [...x.attachments, ...data.attachment];
          return {...x, attachments};
        }
        return x;
      });
  },

  updateDataAttachmentIn(state, data) {
      state.dataDocument = state.dataDocumentmap(x => {
        if(x.pk === data.requestForProductionId) {
          const attachments = x.attachments.map(attachment => {
            if (attachment.pk === data.attachment.pk) {
              return data.attachment;
            }
            return attachment;
          });
          return {...x, attachments};
        }
        return x;
      });
  },

  removeDataAttachmentIn(state, data) {
      state.dataDocument = state.dataDocument.map(x => {
        if(x.pk === data.requestForProductionId) {
          const attachments = x.attachments.filter(x => x.pk !== data.attachmentId);
          return {...x, attachments};
        }
        return x;
      });
  },
};
