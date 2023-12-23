import _ from "lodash";
import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataMutation(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataKeyPleading = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataKeyPleading[key] || {}).results || []
        ).concat(data[key].results);
        const results = _.uniqBy(mergeTasks, "id"); //remove duplicates
        state.dataKeyPleading[key] = {
          ...data[key],
          results
        };
      }
      state.dataKeyPleading = { ...state.dataKeyPleading };
    }
  },
  addDataMutation(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataKeyPleading[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataMutations(state, { result }) {
    for (const key in state.dataKeyPleading) {
      state.dataKeyPleading[key].results = state.dataKeyPleading[
        key
      ].results.map(x => {
        if (x.id === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataMutations(state, { name, rowId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataKeyPleading) {
        state.dataKeyPleading[key].results = state.dataKeyPleading[
          key
        ].results.filter(x => x.id !== rowId);
        state.dataKeyPleading[key].totals--;
      }
    } else {
      state.dataKeyPleading[name].results = state.dataKeyPleading[
        name
      ].results.filter(x => x.id !== rowId);
      state.dataKeyPleading[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  getDataNote(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },
  updateNotes(state, data) {
    for (const key in state.dataKeyPleading) {
      state.dataKeyPleading[key].results = state.dataKeyPleading[key].results.map(x => {
        if (x.id === data.id) {
          const note_count = x.note_count + 1;
          return { ...x, note_count };
        }
        return x;
      })
    }
    if (data.detail) {
      state.dataCorrespondenceDetail.note_count = state.dataCorrespondenceDetail.note_count + 1
    }
  },
  removeNotes(state, data) {
    for (const key in state.dataKeyPleading) {
      state.dataKeyPleading[key].results = state.dataKeyPleading[key].results.map(x => {
        if (x.id === data.id) {
          return { ...x, note_count: x.note_count - 1 };
        }
        return x;
      })
    }
    if (data.detail) {
      state.dataCorrespondenceDetail.note_count = state.dataCorrespondenceDetail.note_count - 1
    }
  },
  //comments
  getDataCommentKeyPleading(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackKeyPleading(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentKeyPleading(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackKeyPleading(state, data) {
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

  updateCommentKeyPleading(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedbackKeyPleading(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountCommentKeyPleading(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeCommentKeyPleading(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackKeyPleading(state, commentId) {
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
    for (var key in state.dataKeyPleading) {
      state.dataKeyPleading[key].results = state.dataKeyPleading[
        key
      ].results.map(x => {
        if (x.id === data.requestForProductionId) {
          const attachments = [...x.attachments, ...data.attachment];
          return { ...x, attachments };
        }
        return x;
      });
    }
    if (data.detail) {
      state.dataCorrespondenceDetail.attachments = [...state.dataCorrespondenceDetail.attachments, ...data.attachment]
    }
  },

  updateDataAttachmentIn(state, data) {
    for (var key in state.dataKeyPleading) {
      state.dataKeyPleading[key].results = state.dataKeyPleading[
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
    if (data.detail) {
      state.dataCorrespondenceDetail.attachments = state.dataCorrespondenceDetail.attachments.map(attachment => {
        if (attachment.pk === data.attachment.pk) {
          return data.attachment;
        }
        return attachment;
      });
    }
  },

  removeDataAttachmentIn(state, data) {
    for (var key in state.dataKeyPleading) {
      state.dataKeyPleading[key].results = state.dataKeyPleading[
        key
      ].results.map(x => {
        if (x.id === data.requestForProductionId) {
          const attachments = x.attachments.filter(x => x.pk !== data.attachmentId);
          return { ...x, attachments };
        }
        return x;
      });
    }
    if (data.detail) {
      state.dataCorrespondenceDetail.attachments = state.dataCorrespondenceDetail.attachments.filter(x => x.pk !== data.attachmentId);
    }
  },
  //Detail
  setDataMutationDetail(state, data) {
    state.dataCorrespondenceDetail = data
  },
  updateDataMutationsDetail(state, { result }) {
    state.dataCorrespondenceDetail = { ...state.dataCorrespondenceDetail, ...result }
  },
  updateDataDetail(state, result) {
    state.dataCorrespondenceDetail = { ...state.dataCorrespondenceDetail, ...result }
  }
};
