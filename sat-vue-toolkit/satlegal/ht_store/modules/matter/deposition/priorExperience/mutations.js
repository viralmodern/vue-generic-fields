import _ from "lodash";
import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  getDataPriorExperience(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataPriorExperience = data.results;
      state.totals = data.count;
    } else {
      const mergeTasks = state.dataPriorExperience.concat(data.results);
      const results = _.uniqBy(mergeTasks, "pk"); //remove duplicates
      state.dataPriorExperience = results;
      state.totals = data.count;
    }
  },
  updatePriorExperience(state, { result }) {
    state.dataPriorExperience = state.dataPriorExperience.map(x => {
      if (x.pk === result.priorExperienceId) {
        return { ...x, ...result };
      }
      return x;
    });
  },
  addPriorExperience(state, data) {
    state.dataPriorExperience.push(data);
    state.totals++;
  },
  removePriorExperience(state, priorExperienceId) {
    state.dataPriorExperience = state.dataPriorExperience.filter(
      x => x.pk !== priorExperienceId
    );
  },
  setLoading(state, status) {
    state.isLoadingGet = status;
  },

  //notes
  getDataNotePriorExperience(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },

  //comments
  getDataCommentPriorExperience(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackPriorExperience(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentPriorExperience(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackPriorExperience(state, data) {
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

  updateCommentPriorExperience(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedbackPriorExperience(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountCommentPriorExperience(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeCommentPriorExperience(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackPriorExperience(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId);
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

  addDataAttachmentIn(state, data) {
    state.dataPriorExperience = state.dataPriorExperience.map(x => {
      if (x.pk === data.requestForProductionId) {
        const attachments = [...x.attachments, ...data.attachment];
        return { ...x, attachments };
      }
      return x;
    })
    if (data.detail) {
      const attachments = [...state.dataPriorExperienceDetail.attachments, ...data.attachment];
      state.dataPriorExperienceDetail = { ...state.dataPriorExperienceDetail, attachments }
    }
  },

  updateDataAttachmentIn(state, data) {
    state.dataPriorExperience = state.dataPriorExperiencemap(x => {
      if (x.pk === data.requestForProductionId) {
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
      state.dataPriorExperienceDetail.attachments = state.dataPriorExperienceDetail.attachments.map(attachment => {
        if (attachment.pk === data.attachment.pk) {
          return data.attachment;
        }
        return attachment;
      });
    }
  },

  removeDataAttachmentIn(state, data) {
    state.dataPriorExperience = state.dataPriorExperience.map(x => {
      if (x.pk === data.requestForProductionId) {
        const attachments = x.attachments.filter(x => x.pk !== data.attachmentId);
        return { ...x, attachments };
      }
      return x;
    });
    if (data.detail) {
      state.dataPriorExperienceDetail.attachments = state.dataPriorExperienceDetail.attachments.filter(x => x.pk !== data.attachmentId)
    }
  },
  //Detail
  getDataPriorExperienceDetail(state, data) {
    state.dataPriorExperienceDetail = data
  },
  updatePriorExperienceDetail(state, { result }) {
    state.dataPriorExperienceDetail = { ...state.dataPriorExperienceDetail, ...result }
  }
};
