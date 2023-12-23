import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataInfo(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataInfomation = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataInfomation[key] || {}).results || []
        ).concat(data[key].results);
        const results = removeObjectDuplicate(mergeTasks, "id"); //remove duplicates
        state.dataInfomation[key] = {
          ...data[key],
          results
        };
      }
      state.dataInfomation = { ...state.dataInfomation };
    }
  },
  updateDataInfo(state, { result }) {
    for (const key in state.dataInfomation) {
      state.dataInfomation[key].results = state.dataInfomation[
        key
      ].results.map(x => {
        if (x.id === result.id || x.pk === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  addDataInfo(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataInfomation[name];
      data.results.push(result);
      data.totals++;
    });
  },
  removeDataInfo(state, { name, InfoId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataInfomation) {
        state.dataInfomation[key].results = state.dataInfomation[
          key
        ].results.filter(x => x.id !== InfoId);
        state.dataInfomation[key].totals--;
      }
    } else {
      state.dataInfomation[name].results = state.dataInfomation[
        name
      ].results.filter(x => x.id !== InfoId);
      state.dataInfomation[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
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

  addDataAttachmentInInfo(state, data) {
    for (var key in state.dataInfomation) {
      state.dataInfomation[key].results = state.dataInfomation[
        key
      ].results.map(x => {
        if (x.id === data.InfoId) {
          const attachments = [...x.attachments, ...data.attachment];
          return { ...x, attachments };
        }
        return x;
      });
    }
    if (data.detail) {
      const attachments = [...state.dataInfomationDetail.attachments, ...data.attachment];
      state.dataInfomationDetail = { ...state.dataInfomationDetail, attachments }
    }
  },
  updateDataAttachmentInInfo(state, data) {
    for (var key in state.dataInfomation) {
      state.dataInfomation[key].results = state.dataInfomation[
        key
      ].results.map(x => {
        if (x.id === data.InfoId) {
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
      state.dataInfomationDetail.attachments = state.dataInfomationDetail.attachments.map(attachment => {
        if (attachment.pk === data.attachment.pk) {
          return data.attachment;
        }
        return attachment;
      });
    }
  },
  removeDataAttachmentInInfo(state, data) {
    for (var key in state.dataInfomation) {
      state.dataInfomation[key].results = state.dataInfomation[
        key
      ].results.map(x => {
        if (x.id === data.InfoId) {
          const attachments = x.attachments.filter(x => x.pk !== data.attachmentId);
          return { ...x, attachments };
        }
        return x;
      });
    }
    if (data.detail) {
      const attachments = state.dataInfomationDetail.attachments.filter(x => x.pk !== data.attachmentId);
      state.dataInfomationDetail = { ...state.dataInfomationDetail, attachments }
    }
  },
  //notes
  getDataNoteInfo(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },
  //comments
  getDataCommentInfo(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackInfo(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentInfo(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackInfo(state, data) {
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

  updateCommentInfo(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedbackInfo(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountCommentInfo(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeCommentInfo(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackInfo(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  },
  //Detail
  setDataInfoDetail(state, data) {
    state.dataInfomationDetail = data
  },
  updateDataInfoDetail(state, { result }) {
    state.dataInfomationDetail = { ...state.dataInfomationDetail, ...result }
  },
  updateDataDetail(state, result) {
    state.dataInfomationDetail = { ...state.dataInfomationDetail, ...result }
  }
};
