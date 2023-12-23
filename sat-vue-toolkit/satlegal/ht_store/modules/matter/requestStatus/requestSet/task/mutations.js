import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataRequestSetTask(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataRequestSetTask = data;
    } else {
      for (let key in data) {
        const mergeTasks = ((state.dataRequestSetTask[key] || {}).results || []).concat(
          data[key].results
        );
        const results = removeObjectDuplicate(mergeTasks, 'pk'); //remove duplicates
        state.dataRequestSetTask[key] = {
          ...data[key],
          results
        };
      }
      state.dataRequestSetTask = { ...state.dataRequestSetTask };
    }
  },
  addDataRequestSetTask(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataRequestSetTask[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataRequestSetTask(state, { result }) {
    for (const key in state.dataRequestSetTask) {
      state.dataRequestSetTask[key].results = state.dataRequestSetTask[key].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataRequestSetTask(state, { name, requestSetTaskId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataRequestSetTask) {
        state.dataRequestSetTask[key].results = state.dataRequestSetTask[key].results.filter(
          x => x.pk !== requestSetTaskId
        );
        state.dataRequestSetTask[key].totals--;
      }
    } else {
      state.dataRequestSetTask[name].results = state.dataRequestSetTask[name].results.filter(
        x => x.pk !== requestSetTaskId
      );
      state.dataRequestSetTask[name].totals--;
    }
  },

  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  setLoadingGetDetail(state, loading) {
    state.isLoadingGetDetail = loading;
  },
  //notes
  getDataNoteRequestSetTask(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
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

  addDataAttachmentInRequestSetTask(state, data) {
    for (var key in state.dataRequestSetTask) {
      state.dataRequestSetTask[key].results = state.dataRequestSetTask[
        key
      ].results.map(x => {
        if(x.pk === data.requestSetTaskId) {
          const attachments = [...x.attachments, ...data.attachment];
          return {...x, attachments};
        }
        return x;
      });
    }
  },

  updateDataAttachmentInRequestSetTask(state, data) {
    for (var key in state.dataRequestSetTask) {
      state.dataRequestSetTask[key].results = state.dataRequestSetTask[
        key
      ].results.map(x => {
        if(x.pk === data.requestSetTaskId) {
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
    }
  },

  removeDataAttachmentInRequestSetTask(state, data) {
    for (var key in state.dataRequestSetTask) {
      state.dataRequestSetTask[key].results = state.dataRequestSetTask[
        key
      ].results.map(x => {
        if(x.pk === data.requestSetTaskId) {
          const attachments = x.attachments.filter(x => x.pk !== data.attachmentId);
          return {...x, attachments};
        }
        return x;
      });
    }
  },

  //comments
  getDataCommentRequestSetTask(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackRequestSetTask(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentRequestSetTask(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackRequestSetTask(state, data) {
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

  updateCommentRequestSetTask(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },

  updateCommentFeedbackRequestSetTask(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if(x.pk === data.pk) {
        return {...x, ...data};
      }
      return x;
    })
  },

  updateChildCountCommentRequestSetTask(state, {commentId, calculation}) {
    state.dataComment = state.dataComment.map(x => {
      if(x.pk === commentId) {
        return {...x, child_count: calculation(x.child_count)};
      }
      return x;
    })
  },

  removeCommentRequestSetTask(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackRequestSetTask(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  }
};
